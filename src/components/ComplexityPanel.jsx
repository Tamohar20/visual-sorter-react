import { ALGO_INFO } from '../utils/algoInfo';

export default function ComplexityPanel({ algo }) {
  const info = ALGO_INFO[algo];
  return (
    <div className="vs-card">
      <div className="vs-card-title">
        Algorithm Details —{' '}
        <span className="vs-algo-title-badge">{info.name}</span>
      </div>

      <div className="vs-complexity-grid">
        <div className="vs-complexity-item">
          <div className="vs-complexity-label">Best Case</div>
          <div className="vs-complexity-value vs-cv-best">{info.best}</div>
        </div>
        <div className="vs-complexity-item">
          <div className="vs-complexity-label">Average Case</div>
          <div className="vs-complexity-value vs-cv-avg">{info.avg}</div>
        </div>
        <div className="vs-complexity-item">
          <div className="vs-complexity-label">Worst Case</div>
          <div className="vs-complexity-value vs-cv-worst">{info.worst}</div>
        </div>
        <div className="vs-complexity-item">
          <div className="vs-complexity-label">Space</div>
          <div className="vs-complexity-value vs-cv-space">{info.space}</div>
        </div>
      </div>

      <div className="vs-algo-desc">{info.desc}</div>
    </div>
  );
}
