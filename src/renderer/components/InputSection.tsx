import React from 'react';
import './InputSection.css';

interface InputSectionProps {
  mode: 'refine' | 'intent';
  inputText: string;
  onInputChange: (text: string) => void;
  context: string;
  onContextChange: (context: string) => void;
  onAction: () => void;
  onClear: () => void;
  isLoading: boolean;
}

/**
 * Input section with text areas and action buttons
 */
function InputSection({
  mode,
  inputText,
  onInputChange,
  context,
  onContextChange,
  onAction,
  onClear,
  isLoading,
}: InputSectionProps) {
  const inputLabel = mode === 'refine' ? 'Original Text' : 'What do you want to say?';
  const actionLabel = mode === 'refine' ? 'Refine' : 'Generate';

  return (
    <div className="input-section">
      {/* Main Input */}
      <div className="input-group">
        <label>{inputLabel}</label>
        <textarea
          className="main-input"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={mode === 'refine' ? 'Paste or type your text here...' : 'Describe what you want to communicate...'}
          rows={6}
          disabled={isLoading}
        />
      </div>

      {/* Context Input */}
      <div className="input-group">
        <label>Context (optional)</label>
        <textarea
          className="context-input"
          value={context}
          onChange={(e) => onContextChange(e.target.value)}
          placeholder="Add context to improve results..."
          rows={2}
          disabled={isLoading}
        />
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          className="btn btn-primary"
          onClick={onAction}
          disabled={!inputText.trim() || isLoading}
        >
          {isLoading ? 'Processing...' : actionLabel}
        </button>
        <button
          className="btn btn-secondary"
          onClick={onClear}
          disabled={isLoading}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default InputSection;
