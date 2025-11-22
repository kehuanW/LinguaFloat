import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import InputSection from '../components/InputSection';
import ResultPanel from '../components/ResultPanel';
import { AppSettings, LLMResponse } from '../types/electron';
import './FloatingWindow.css';

/**
 * Main floating window UI
 * Contains mode tabs, input section, and result panel
 */
function FloatingWindow() {
  // UI State
  const [mode, setMode] = useState<'refine' | 'intent'>('refine');
  const [tone, setTone] = useState('neutral');
  const [style, setStyle] = useState('refine');

  // Input state
  const [inputText, setInputText] = useState('');
  const [context, setContext] = useState('');

  // Result state
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Settings
  const [settings, setSettings] = useState<AppSettings | null>(null);

  /**
   * Load settings on mount
   */
  useEffect(() => {
    loadSettings();
  }, []);

  /**
   * Auto-paste clipboard if enabled
   */
  useEffect(() => {
    if (settings?.autoPasteClipboard) {
      window.electronAPI.getClipboard().then((text) => {
        if (text && !inputText) {
          setInputText(text);
        }
      });
    }
  }, [settings]);

  /**
   * Load settings from Electron
   */
  const loadSettings = async () => {
    try {
      const loadedSettings = await window.electronAPI.getSettings();
      setSettings(loadedSettings);

      // Apply default tone and style
      setTone(loadedSettings.defaultTone);
      setStyle(loadedSettings.defaultStyle);

      // Apply theme
      document.documentElement.setAttribute(
        'data-theme',
        loadedSettings.theme
      );
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  };

  /**
   * Handle opening settings
   */
  const handleOpenSettings = () => {
    window.location.hash = '#/settings';
  };

  /**
   * Handle main action (Refine or Generate)
   */
  const handleAction = async () => {
    setError('');
    setResult('');
    setIsLoading(true);

    try {
      let response: LLMResponse;

      if (mode === 'refine') {
        response = await window.electronAPI.refineText({
          originalText: inputText,
          tone,
          style,
          context: context || undefined,
        });
      } else {
        response = await window.electronAPI.generateFromIntent({
          intent: inputText,
          tone,
          style,
          context: context || undefined,
        });
      }

      if (response.success && response.result) {
        setResult(response.result);
      } else {
        setError(response.error || 'An error occurred');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle clear
   */
  const handleClear = () => {
    setInputText('');
    setContext('');
    setResult('');
    setError('');
  };

  /**
   * Handle copy result
   */
  const handleCopy = async () => {
    await window.electronAPI.setClipboard(result);
  };

  /**
   * Handle copy and close
   */
  const handleCopyAndClose = async () => {
    await window.electronAPI.setClipboard(result);
    await window.electronAPI.closeWindow();
  };

  return (
    <div className="floating-window">
      <Header
        mode={mode}
        onModeChange={setMode}
        tone={tone}
        onToneChange={setTone}
        style={style}
        onStyleChange={setStyle}
        onOpenSettings={handleOpenSettings}
      />

      <div className="content">
        <InputSection
          mode={mode}
          inputText={inputText}
          onInputChange={setInputText}
          context={context}
          onContextChange={setContext}
          onAction={handleAction}
          onClear={handleClear}
          isLoading={isLoading}
        />

        {error && <div className="error-message">{error}</div>}

        {result && (
          <ResultPanel
            result={result}
            onResultChange={setResult}
            onCopy={handleCopy}
            onCopyAndClose={handleCopyAndClose}
          />
        )}
      </div>
    </div>
  );
}

export default FloatingWindow;
