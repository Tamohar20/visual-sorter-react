const BAR_COLORS = {
  sorted:  'var(--bar-sorted)',
  swap:    'var(--bar-swap)',
  compare: 'var(--bar-compare)',
  pivot:   'var(--bar-pivot)',
  active:  'var(--bar-active)',
  default: 'var(--bar-default)',
};

const LEGEND = [
  { label: 'Unsorted',  color: 'var(--bar-default)' },
  { label: 'Comparing', color: 'var(--bar-compare)'  },
  { label: 'Swapping',  color: 'var(--bar-swap)'     },
  { label: 'Sorted',    color: 'var(--bar-sorted)'   },
  { label: 'Pivot',     color: 'var(--bar-pivot)'    },
];

const SPEEDS = ['slow', 'medium', 'fast', 'turbo'];

function getBarColor(idx, highlights) {
  if (!highlights) return BAR_COLORS.default;
  if (highlights.sorted  && highlights.sorted.has(idx))  return BAR_COLORS.sorted;
  if (highlights.swap    && highlights.swap.has(idx))    return BAR_COLORS.swap;
  if (highlights.compare && highlights.compare.has(idx)) return BAR_COLORS.compare;
  if (highlights.pivot   && highlights.pivot.has(idx))   return BAR_COLORS.pivot;
  if (highlights.active  && highlights.active.has(idx))  return BAR_COLORS.active;
  return BAR_COLORS.default;
}

export default function Visualizer({
  bars, highlights, comparisons, swaps,
  isRunning, isPaused,
  status, stepMsg,
  speed, onSetSpeed,
  onStart, onPauseResume, onStep, onReset,
}) {
  const max = bars.length ? Math.max(...bars) : 1;

  return (
    <div className="vs-viz-wrapper">
      {/* Header row */}
      <div className="vs-viz-header">
        <div className="vs-viz-info">
          <div className="vs-viz-stat">Comparisons: <strong>{comparisons}</strong></div>
          <div className="vs-viz-stat">Swaps: <strong>{swaps}</strong></div>
          <div className="vs-viz-stat">Array Size: <strong>{bars.length}</strong></div>
        </div>
        <div className="vs-legend">
          {LEGEND.map(l => (
            <div key={l.label} className="vs-legend-item">
              <div className="vs-legend-dot" style={{ background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>

      {/* Bar chart */}
      <div className="vs-bar-container">
        {bars.map((val, i) => (
          <div
            key={i}
            className="vs-bar"
            style={{
              height: `${(val / max) * 100}%`,
              background: getBarColor(i, highlights),
            }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="vs-controls-bar">
        <button className="vs-btn vs-btn-success" onClick={onStart} disabled={isRunning}>
          ▶ Start
        </button>
        <button className="vs-btn vs-btn-ghost" onClick={onPauseResume} disabled={!isRunning}>
          {isPaused ? '▶ Resume' : '⏸ Pause'}
        </button>
        <button className="vs-btn vs-btn-outline" onClick={onStep}>
          ⏭ Step
        </button>
        <button className="vs-btn vs-btn-danger" onClick={onReset} disabled={isRunning && !isPaused}>
          ↺ Reset
        </button>

        <div className="vs-speed-group">
          <span className="vs-speed-label">Speed:</span>
          {SPEEDS.map(s => (
            <button
              key={s}
              className={`vs-speed-btn${speed === s ? ' active' : ''}`}
              onClick={() => onSetSpeed(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="vs-status-bar">
        <div className={`vs-status-dot ${status.state}`} />
        <span className="vs-status-text">{status.msg}</span>
      </div>
    </div>
  );
}
