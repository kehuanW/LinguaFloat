import React from 'react';
import './ResultPanel.css';

interface ResultPanelProps {
  result: string;
  onResultChange: (result: string) => void;
  onCopy: () => void;
  onCopyAndClose: () => void;
}

/**
 * Result panel showing the refined/generated text with copy options
 */
function ResultPanel({
  result,
  onResultChange,
  onCopy,
  onCopyAndClose,
}: ResultPanelProps) {
  return (
    <div className="result-panel">
      <div className="result-header">
        <label>Result</label>
      </div>

      <textarea
        className="result-text"
        value={result}
        onChange={(e) => onResultChange(e.target.value)}
        rows={6}
      />

      <div className="result-buttons">
        <button className="btn btn-secondary" onClick={onCopy}>
          Copy
        </button>
        <button className="btn btn-primary" onClick={onCopyAndClose}>
          Copy & Close
        </button>
      </div>
    </div>
  );
}

export default ResultPanel;
