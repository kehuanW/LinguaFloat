import { contextBridge, ipcRenderer } from 'electron';

/**
 * Preload script - provides a secure bridge between main and renderer processes
 * Exposes only specific, whitelisted IPC methods to the renderer
 */

export interface ElectronAPI {
  // Settings
  getSettings: () => Promise<any>;
  saveSettings: (settings: any) => Promise<{ success: boolean }>;

  // Clipboard
  getClipboard: () => Promise<string>;
  setClipboard: (text: string) => Promise<{ success: boolean }>;

  // Window management
  closeWindow: () => Promise<{ success: boolean }>;
  closeSettings: () => Promise<{ success: boolean }>;

  // Hotkey info
  getHotkey: () => Promise<string>;

  // LLM operations
  refineText: (request: any) => Promise<any>;
  generateFromIntent: (request: any) => Promise<any>;
}

/**
 * Expose protected methods via contextBridge
 * This ensures the renderer cannot access Node.js directly
 */
const electronAPI: ElectronAPI = {
  // Settings management
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),

  // Clipboard operations
  getClipboard: () => ipcRenderer.invoke('get-clipboard'),
  setClipboard: (text) => ipcRenderer.invoke('set-clipboard', text),

  // Window management
  closeWindow: () => ipcRenderer.invoke('close-window'),
  closeSettings: () => ipcRenderer.invoke('close-settings'),

  // Get hotkey display string
  getHotkey: () => ipcRenderer.invoke('get-hotkey'),

  // LLM operations
  refineText: (request) => ipcRenderer.invoke('refine-text', request),
  generateFromIntent: (request) => ipcRenderer.invoke('generate-from-intent', request),
};

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// Log for debugging
console.log('Preload script executed - electronAPI exposed to window');
