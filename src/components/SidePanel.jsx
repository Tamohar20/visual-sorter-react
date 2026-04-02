import { useState } from 'react';
import { ALGO_INFO } from '../utils/algoInfo';

function SaveLoadCard({ array, onLoadArray }) {
  const [savedInfo, setSavedInfo] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem('vs_saved') || '[]');
      return s.length ? `${s.length} array(s) saved` : 'No saved arrays';
    } catch { return 'No saved arrays'; }
  });

  function save() {
    try {
      const store = JSON.parse(localStorage.getItem('vs_saved') || '[]');
      store.push({ arr: array, ts: Date.now() });
      if (store.length > 5) store.shift();
      localStorage.setItem('vs_saved', JSON.stringify(store));
      setSavedInfo(`${store.length} array(s) saved`);
    } catch { alert('Save failed'); }
  }

  function load() {
    try {
      const store = JSON.parse(localStorage.getItem('vs_saved') || '[]');
      if (!store.length) { alert('No saved arrays found'); return; }
      const last = store[store.length - 1];
      onLoadArray(last.arr);
      setSavedInfo(`${store.length} array(s) saved`);
    } catch { alert('Load failed'); }
  }

  function clear() {
    localStorage.removeItem('vs_saved');
    setSavedInfo('No saved arrays');
  }

  return (
    <div className="vs-card">
      <div className="vs-card-title">Save / Load Array</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button className="vs-btn vs-btn-outline vs-btn-sm" onClick={save}>💾 Save Current Array</button>
        <button className="vs-btn vs-btn-ghost   vs-btn-sm" onClick={load}>📂 Load Saved Array</button>
        <button className="vs-btn vs-btn-ghost   vs-btn-sm" onClick={clear}>🗑 Clear Saved</button>
        <div className="vs-saved-info">{savedInfo}</div>
      </div>
    </div>
  );
}

function CompareCard({ array, compResults, onRunComparison, isRunning }) {
  const algos   = Object.keys(ALGO_INFO);
  const maxVal  = Math.max(...Object.values(compResults), 0.001);
  const hasData = Object.keys(compResults).length > 0;

  return (
    <div className="vs-card">
      <div className="vs-card-title">Algo Performance (ms)</div>
      <div className="vs-hint">Run each algo on current array to populate.</div>

      {hasData && (
        <div className="vs-compare-bars">
          {algos.map(algo => {
            const ms  = compResults[algo] || 0;
            const pct = (ms / maxVal) * 100;
            const name = ALGO_INFO[algo].name.replace(' Sort', '');
            return (
              <div key={algo} className="vs-compare-row">
                <span className="vs-compare-name">{name}</span>
                <div className="vs-compare-outer">
                  <div className="vs-compare-inner" style={{ width: `${pct}%` }}>
                    {pct > 22 && <span className="vs-compare-time-inline">{ms}ms</span>}
                  </div>
                </div>
                <span className="vs-compare-time">{ms}ms</span>
              </div>
            );
          })}
        </div>
      )}

      <button
        className="vs-btn vs-btn-outline vs-btn-sm"
        style={{ marginTop: 12, width: '100%' }}
        onClick={() => onRunComparison(array)}
        disabled={isRunning}
      >
        ⚡ Run All &amp; Compare
      </button>
    </div>
  );
}

function ArrayCard({ array }) {
  return (
    <div className="vs-card">
      <div className="vs-card-title">Current Array</div>
      <div className="vs-array-display">{array.join(', ')}</div>
    </div>
  );
}

function SortLogCard({ sortLog }) {
  return (
    <div className="vs-card">
      <div className="vs-card-title">Sort Log</div>
      <div className="vs-sort-log">
        {sortLog.length === 0
          ? <span className="vs-log-empty">No sorts run yet.</span>
          : sortLog.map((entry, i) => (
              <span key={i} className="vs-log-entry">{entry}</span>
            ))
        }
      </div>
    </div>
  );
}

export default function SidePanel({ array, compResults, sortLog, onRunComparison, onLoadArray, isRunning }) {
  return (
    <div className="vs-right">
      <SaveLoadCard    array={array} onLoadArray={onLoadArray} />
      <CompareCard     array={array} compResults={compResults} onRunComparison={onRunComparison} isRunning={isRunning} />
      <ArrayCard       array={array} />
      <SortLogCard     sortLog={sortLog} />
    </div>
  );
}
