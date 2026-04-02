// ============================================================
// ArrayInput.jsx — Custom array text field + size slider
// ============================================================
import { useState } from 'react';

export default function ArrayInput({ onApply, onGenerate, disabled }) {
  const [customVal, setCustomVal] = useState('');
  const [size, setSize]           = useState(30);

  function handleApply() {
    const result = onApply(customVal);
    if (result === null) {
      alert('Please enter 2–100 valid numbers (1–999), comma-separated.');
    }
  }

  return (
    <div className="vs-card">
      <div className="vs-card-title">Array Input</div>

      <div className="vs-input-row">
        <div className="vs-form-group" style={{ flex: 1 }}>
          <label className="vs-label">Custom Array (comma-separated)</label>
          <input
            className="vs-input"
            type="text"
            placeholder="e.g. 64, 25, 12, 22, 11, 45, 3, 90"
            value={customVal}
            onChange={e => setCustomVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleApply()}
            disabled={disabled}
          />
        </div>
        <div className="vs-form-group">
          <label className="vs-label">&nbsp;</label>
          <button className="vs-btn vs-btn-primary" onClick={handleApply} disabled={disabled}>Apply</button>
        </div>
        <div className="vs-form-group">
          <label className="vs-label">&nbsp;</label>
          <button className="vs-btn vs-btn-outline" onClick={() => onGenerate(size)} disabled={disabled}>
            🎲 Random
          </button>
        </div>
      </div>

      <div className="vs-size-row">
        <span className="vs-size-label">Array Size:</span>
        <input
          type="range"
          className="vs-range"
          min={5} max={80}
          value={size}
          onChange={e => setSize(Number(e.target.value))}
          disabled={disabled}
        />
        <span className="vs-size-val">{size}</span>
      </div>
    </div>
  );
}
