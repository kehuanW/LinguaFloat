import { app, BrowserWindow, ipcMain, clipboard, screen, Tray } from 'electron';
import path from 'path';
import { createTray } from './tray';
import { registerGlobalHotkeys, unregisterGlobalHotkeys, getHotkeyString } from './hotkeys';
import { loadSettings, saveSettings, AppSettings } from '../utils/settings';
import { refineText, generateFromIntent, RefineRequest, IntentRequest } from '../services/llm';

// Get the absolute path to the preload script
const PRELOAD_PATH = path.join(__dirname, '../../preload/index.js');
console.log('Preload path:', PRELOAD_PATH);
console.log('__dirname:', __dirname);

/**
 * Main application class
 * Manages windows, tray, hotkeys, and IPC communication
 */
class LinguaFloatApp {
  private floatingWindow: BrowserWindow | null = null;
  private settingsWindow: BrowserWindow | null = null;
  private _tray: Tray | null = null;
  private settings: AppSettings;

  constructor() {
    this.settings = loadSettings();
    this.init();
  }

  /**
   * Initialize the application
   */
  private init(): void {
    // Handle app ready
    app.whenReady().then(() => {
      this.createTray();
      this.registerHotkeys();
      this.setupIPC();

      // On macOS, apps stay active until explicitly quit
      app.on('activate', () => {
        if (this.floatingWindow === null) {
          this.createFloatingWindow();
        }
      });
    });

    // Quit when all windows are closed (except on macOS)
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        // On Windows/Linux, keep the app running in tray
        // app.quit();
      }
    });

    // Cleanup on quit
    app.on('will-quit', () => {
      unregisterGlobalHotkeys();
    });
  }

  /**
   * Create the system tray icon
   */
  private createTray(): void {
    this._tray = createTray(
      () => this.showFloatingWindow(),
      () => this.showSettingsWindow()
    );
  }

  /**
   * Register global hotkeys
   */
  private registerHotkeys(): void {
    registerGlobalHotkeys(() => this.toggleFloatingWindow());
  }

  /**
   * Create the floating window (main UI)
   */
  private createFloatingWindow(): BrowserWindow {
    // Get cursor position for smart placement
    const cursorPos = screen.getCursorScreenPoint();
    const display = screen.getDisplayNearestPoint(cursorPos);

    // Use saved position or default to near cursor
    let x = cursorPos.x - 200;
    let y = cursorPos.y - 150;

    if (this.settings.windowPosition) {
      x = this.settings.windowPosition.x;
      y = this.settings.windowPosition.y;
    }

    // Ensure window is on screen
    x = Math.max(display.workArea.x, Math.min(x, display.workArea.x + display.workArea.width - 400));
    y = Math.max(display.workArea.y, Math.min(y, display.workArea.y + display.workArea.height - 500));

    this.floatingWindow = new BrowserWindow({
      width: 500,
      height: 600,
      x,
      y,
      frame: false,
      transparent: false,
      resizable: false,
      alwaysOnTop: true,
      skipTaskbar: true,
      show: false,
      webPreferences: {
        preload: PRELOAD_PATH,
        contextIsolation: true,
        nodeIntegration: false,
      },
    });

    // Load the renderer
    if (process.env.NODE_ENV === 'development') {
      this.floatingWindow.loadURL('http://localhost:5173');
      this.floatingWindow.webContents.openDevTools({ mode: 'detach' });
    } else {
      this.floatingWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
    }

    // Show when ready
    this.floatingWindow.once('ready-to-show', () => {
      this.floatingWindow?.show();
      this.floatingWindow?.focus();
    });

    // Save position on move
    this.floatingWindow.on('move', () => {
      if (this.floatingWindow) {
        const [x, y] = this.floatingWindow.getPosition();
        this.settings.windowPosition = { x, y };
        saveSettings(this.settings);
      }
    });

    // Handle close
    this.floatingWindow.on('closed', () => {
      this.floatingWindow = null;
    });

    // Handle click outside (if enabled)
    if (this.settings.closeOnClickOutside) {
      this.floatingWindow.on('blur', () => {
        this.floatingWindow?.hide();
      });
    }

    return this.floatingWindow;
  }

  /**
   * Create the settings window
   */
  private createSettingsWindow(): BrowserWindow {
    // Center on screen
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    this.settingsWindow = new BrowserWindow({
      width: 500,
      height: 600,
      x: Math.floor((width - 500) / 2),
      y: Math.floor((height - 600) / 2),
      resizable: false,
      alwaysOnTop: false,
      show: false,
      webPreferences: {
        preload: PRELOAD_PATH,
        contextIsolation: true,
        nodeIntegration: false,
      },
    });

    // Load the renderer with settings route
    if (process.env.NODE_ENV === 'development') {
      this.settingsWindow.loadURL('http://localhost:5173#/settings');
    } else {
      this.settingsWindow.loadFile(path.join(__dirname, '../renderer/index.html'), {
        hash: '/settings',
      });
    }

    // Show when ready
    this.settingsWindow.once('ready-to-show', () => {
      this.settingsWindow?.show();
    });

    // Handle close
    this.settingsWindow.on('closed', () => {
      this.settingsWindow = null;
    });

    return this.settingsWindow;
  }

  /**
   * Show the floating window (create if needed)
   */
  private showFloatingWindow(): void {
    if (!this.floatingWindow) {
      this.createFloatingWindow();
    } else {
      this.floatingWindow.show();
      this.floatingWindow.focus();
    }
  }

  /**
   * Hide the floating window
   */
  private hideFloatingWindow(): void {
    this.floatingWindow?.hide();
  }

  /**
   * Toggle floating window visibility
   */
  private toggleFloatingWindow(): void {
    if (!this.floatingWindow || !this.floatingWindow.isVisible()) {
      this.showFloatingWindow();
    } else {
      this.hideFloatingWindow();
    }
  }

  /**
   * Show the settings window (create if needed)
   */
  private showSettingsWindow(): void {
    if (!this.settingsWindow) {
      this.createSettingsWindow();
    } else {
      this.settingsWindow.show();
      this.settingsWindow.focus();
    }
  }

  /**
   * Setup IPC handlers for communication with renderer
   */
  private setupIPC(): void {
    // Get settings
    ipcMain.handle('get-settings', async () => {
      return this.settings;
    });

    // Save settings
    ipcMain.handle('save-settings', async (_, newSettings: AppSettings) => {
      this.settings = newSettings;
      saveSettings(newSettings);
      return { success: true };
    });

    // Get clipboard content
    ipcMain.handle('get-clipboard', async () => {
      return clipboard.readText();
    });

    // Set clipboard content
    ipcMain.handle('set-clipboard', async (_, text: string) => {
      clipboard.writeText(text);
      return { success: true };
    });

    // Close window
    ipcMain.handle('close-window', async () => {
      this.hideFloatingWindow();
      return { success: true };
    });

    // Close settings window
    ipcMain.handle('close-settings', async () => {
      this.settingsWindow?.close();
      return { success: true };
    });

    // Get hotkey string
    ipcMain.handle('get-hotkey', async () => {
      return getHotkeyString();
    });

    // Refine text
    ipcMain.handle('refine-text', async (_, request: RefineRequest) => {
      return await refineText(this.settings.apiKey, request);
    });

    // Generate from intent
    ipcMain.handle('generate-from-intent', async (_, request: IntentRequest) => {
      return await generateFromIntent(this.settings.apiKey, request);
    });
  }
}

// Start the application
new LinguaFloatApp();
