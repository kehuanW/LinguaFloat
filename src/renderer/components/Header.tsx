import React from 'react';
import './Header.css';

interface HeaderProps {
  mode: 'refine' | 'intent';
  onModeChange: (mode: 'refine' | 'intent') => void;
  tone: string;
  onToneChange: (tone: string) => void;
  style: string;
  onStyleChange: (style: string) => void;
  onOpenSettings: () => void;
}

/**
 * Header component with mode tabs, tone/style dropdowns, and settings button
 */
function Header({
  mode,
  onModeChange,
  tone,
  onToneChange,
  style,
  onStyleChange,
  onOpenSettings,
}: HeaderProps) {
  return (
    <div className="header">
      {/* Mode Tabs */}
      <div className="mode-tabs">
        <button
          className={`tab ${mode === 'refine' ? 'active' : ''}`}
          onClick={() => onModeChange('refine')}
        >
          Refine
        </button>
        <button
          className={`tab ${mode === 'intent' ? 'active' : ''}`}
          onClick={() => onModeChange('intent')}
        >
          Write from Intent
        </button>
      </div>

      {/* Controls Row */}
      <div className="controls">
        {/* Tone Dropdown */}
        <div className="control-group">
          <label>Tone</label>
          <select value={tone} onChange={(e) => onToneChange(e.target.value)}>
            <option value="neutral">Neutral</option>
            <option value="professional">Professional</option>
            <option value="warm">Warm</option>
          </select>
        </div>

        {/* Style Dropdown */}
        <div className="control-group">
          <label>Style</label>
          <select value={style} onChange={(e) => onStyleChange(e.target.value)}>
            <option value="refine">Refine</option>
            <option value="shorter">Shorter</option>
            <option value="more_polite">More Polite</option>
          </select>
        </div>

        {/* Settings Button */}
        <button className="settings-btn" onClick={onOpenSettings} title="Settings">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6m8.66-10.34l-4.24 4.24m-4.24 4.24l-4.24 4.24M23 12h-6m-6 0H1m18.66 8.66l-4.24-4.24m-4.24-4.24l-4.24-4.24" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Header;
