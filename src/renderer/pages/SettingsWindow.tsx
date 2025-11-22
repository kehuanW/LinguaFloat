import React, { useState, useEffect } from 'react';
import { AppSettings } from '../types/electron';
import './SettingsWindow.css';

/**
 * Settings window for configuring the application
 */
function SettingsWindow() {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [hotkey, setHotkey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  /**
   * Load settings and hotkey on mount
   */
  useEffect(() => {
    loadSettings();
    loadHotkey();
  }, []);

  /**
   * Load settings from Electron
   */
  const loadSettings = async () => {
    try {
      const loadedSettings = await window.electronAPI.getSettings();
      setSettings(loadedSettings);
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  };

  /**
   * Load hotkey string
   */
  const loadHotkey = async () => {
    try {
      const hotkeyString = await window.electronAPI.getHotkey();
      setHotkey(hotkeyString);
    } catch (err) {
      console.error('Failed to load hotkey:', err);
    }
  };

  /**
   * Update a setting value
   */
  const updateSetting = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    if (settings) {
      setSettings({ ...settings, [key]: value });
    }
  };

  /**
   * Save settings
   */
  const handleSave = async () => {
    if (!settings) return;

    setIsSaving(true);
    setSaveMessage('');

    try {
      await window.electronAPI.saveSettings(settings);
      setSaveMessage('Settings saved successfully!');

      // Apply theme immediately
      document.documentElement.setAttribute('data-theme', settings.theme);

      // Clear message after 2 seconds
      setTimeout(() => setSaveMessage(''), 2000);
    } catch (err) {
      setSaveMessage('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Close settings window
   */
  const handleClose = async () => {
    await window.electronAPI.closeSettings();
  };

  if (!settings) {
    return (
      <div className="settings-window">
        <div className="loading">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="settings-window" data-theme={settings.theme}>
      <div className="settings-header">
        <h1>Settings</h1>
        <button className="close-btn" onClick={handleClose}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="settings-content">
        {/* API Key */}
        <div className="setting-section">
          <h2>API Configuration</h2>
          <div className="setting-item">
            <label htmlFor="apiKey">
              OpenAI API Key
              <span className="required">*</span>
            </label>
            <input
              id="apiKey"
              type="password"
              value={settings.apiKey}
              onChange={(e) => updateSetting('apiKey', e.target.value)}
              placeholder="sk-..."
            />
            <p className="setting-hint">
              Your API key is stored locally and never shared.
            </p>
          </div>
        </div>

        {/* Defaults */}
        <div className="setting-section">
          <h2>Defaults</h2>
          <div className="setting-item">
            <label htmlFor="defaultTone">Default Tone</label>
            <select
              id="defaultTone"
              value={settings.defaultTone}
              onChange={(e) => updateSetting('defaultTone', e.target.value as any)}
            >
              <option value="neutral">Neutral</option>
              <option value="professional">Professional</option>
              <option value="warm">Warm</option>
            </select>
          </div>

          <div className="setting-item">
            <label htmlFor="defaultStyle">Default Style</label>
            <select
              id="defaultStyle"
              value={settings.defaultStyle}
              onChange={(e) => updateSetting('defaultStyle', e.target.value as any)}
            >
              <option value="refine">Refine</option>
              <option value="shorter">Shorter</option>
              <option value="more_polite">More Polite</option>
            </select>
          </div>
        </div>

        {/* Behavior */}
        <div className="setting-section">
          <h2>Behavior</h2>
          <div className="setting-item checkbox-item">
            <label>
              <input
                type="checkbox"
                checked={settings.autoPasteClipboard}
                onChange={(e) =>
                  updateSetting('autoPasteClipboard', e.target.checked)
                }
              />
              Auto-paste from clipboard
            </label>
            <p className="setting-hint">
              Automatically fill the input field with clipboard content when opening
              the window.
            </p>
          </div>

          <div className="setting-item checkbox-item">
            <label>
              <input
                type="checkbox"
                checked={settings.closeOnClickOutside}
                onChange={(e) =>
                  updateSetting('closeOnClickOutside', e.target.checked)
                }
              />
              Close when clicking outside
            </label>
            <p className="setting-hint">
              Automatically hide the window when it loses focus.
            </p>
          </div>
        </div>

        {/* Appearance */}
        <div className="setting-section">
          <h2>Appearance</h2>
          <div className="setting-item">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              value={settings.theme}
              onChange={(e) => updateSetting('theme', e.target.value as any)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        {/* Hotkey Info */}
        <div className="setting-section">
          <h2>Keyboard Shortcut</h2>
          <div className="setting-item">
            <label>Global Hotkey</label>
            <div className="hotkey-display">
              <code>{hotkey}</code>
            </div>
            <p className="setting-hint">
              Press this shortcut anywhere to open LinguaFloat.
            </p>
          </div>
        </div>
      </div>

      {/* Save Section */}
      <div className="settings-footer">
        {saveMessage && (
          <div className={`save-message ${saveMessage.includes('success') ? 'success' : 'error'}`}>
            {saveMessage}
          </div>
        )}
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={isSaving || !settings.apiKey}
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}

export default SettingsWindow;
