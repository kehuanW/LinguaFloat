/**
 * TypeScript definitions for the Electron API exposed via preload
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

export interface RefineRequest {
  originalText: string;
  tone: string;
  style: string;
  context?: string;
}

export interface IntentRequest {
  intent: string;
  tone: string;
  style: string;
  context?: string;
}

export interface LLMResponse {
  success: boolean;
  result?: string;
  error?: string;
}

export interface ElectronAPI {
  getSettings: () => Promise<AppSettings>;
  saveSettings: (settings: AppSettings) => Promise<{ success: boolean }>;
  getClipboard: () => Promise<string>;
  setClipboard: (text: string) => Promise<{ success: boolean }>;
  closeWindow: () => Promise<{ success: boolean }>;
  closeSettings: () => Promise<{ success: boolean }>;
  getHotkey: () => Promise<string>;
  refineText: (request: RefineRequest) => Promise<LLMResponse>;
  generateFromIntent: (request: IntentRequest) => Promise<LLMResponse>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
