import { app, Tray, Menu, nativeImage } from 'electron';
import path from 'path';

/**
 * Create and configure the system tray/menu bar icon
 */
export function createTray(onShowWindow: () => void, onShowSettings: () => void): Tray {
  // Create a simple tray icon (in production, use proper icon files)
  // For development, we'll create a simple template image
  const iconPath = path.join(__dirname, '../../assets/tray-icon.png');

  // Fallback: create a simple icon if asset doesn't exist
  let trayIcon: nativeImage;
  try {
    trayIcon = nativeImage.createFromPath(iconPath);
    if (trayIcon.isEmpty()) {
      throw new Error('Icon is empty');
    }
  } catch {
    // Create a simple 16x16 template icon for development
    trayIcon = nativeImage.createFromDataURL(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
      'TklEQVR4nGNgYGD4TyFmIEtzKzAwMPxnYGD4T6phDAwM/ymxgWQDyDWcqICcm0lxAU0CIA8Q60dKXECuC0gOQmq5gBIXkGwApS4gBgMAKtcH' +
      'Md/P8vQAAAAASUVORK5CYII='
    );
  }

  // Resize for platform
  if (process.platform === 'darwin') {
    trayIcon = trayIcon.resize({ width: 16, height: 16 });
    trayIcon.setTemplateImage(true);
  }

  const tray = new Tray(trayIcon);

  // Set tooltip
  tray.setToolTip('LinguaFloat - Quick English Writing Assistant');

  // Create context menu
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open LinguaFloat',
      click: onShowWindow,
    },
    {
      label: 'Settings',
      click: onShowSettings,
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);

  // Click to open window (mainly for Windows)
  tray.on('click', () => {
    onShowWindow();
  });

  return tray;
}
