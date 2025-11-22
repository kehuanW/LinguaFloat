import { app } from 'electron';
import fs from 'fs';
import path from 'path';

/**
 * Application settings interface
 */
export interface AppSettings {
  apiKey: string;
  defaultTone: 'neutral' | 'professional' | 'warm';
  defaultStyle: 'refine' | 'shorter' | 'more_polite';
  autoPasteClipboard: boolean;
  closeOnClickOutside: boolean;
  theme: 'light' | 'dark';
  windowPosition?: {
    x: number;
    y: number;
  };
}

/**
 * Default settings when the app is first launched
 */
const defaultSettings: AppSettings = {
  apiKey: '',
  defaultTone: 'neutral',
  defaultStyle: 'refine',
  autoPasteClipboard: true,
  closeOnClickOutside: false,
  theme: 'light',
};

/**
 * Get the path to the settings file
 */
function getSettingsPath(): string {
  const userDataPath = app.getPath('userData');
  return path.join(userDataPath, 'settings.json');
}

/**
 * Load settings from disk. Returns default settings if file doesn't exist.
 */
export function loadSettings(): AppSettings {
  try {
    const settingsPath = getSettingsPath();

    if (!fs.existsSync(settingsPath)) {
      // First launch - create settings file with defaults
      saveSettings(defaultSettings);
      return defaultSettings;
    }

    const data = fs.readFileSync(settingsPath, 'utf-8');
    const settings = JSON.parse(data);

    // Merge with defaults to handle new settings in updates
    return { ...defaultSettings, ...settings };
  } catch (error) {
    console.error('Error loading settings:', error);
    return defaultSettings;
  }
}

/**
 * Save settings to disk
 */
export function saveSettings(settings: AppSettings): void {
  try {
    const settingsPath = getSettingsPath();
    const userDataPath = app.getPath('userData');

    // Ensure user data directory exists
    if (!fs.existsSync(userDataPath)) {
      fs.mkdirSync(userDataPath, { recursive: true });
    }

    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving settings:', error);
    throw error;
  }
}

/**
 * Update specific settings without overwriting everything
 */
export function updateSettings(updates: Partial<AppSettings>): AppSettings {
  const currentSettings = loadSettings();
  const newSettings = { ...currentSettings, ...updates };
  saveSettings(newSettings);
  return newSettings;
}
