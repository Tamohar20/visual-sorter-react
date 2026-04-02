import { ALGO_INFO } from '../utils/algoInfo';

const ALGOS = Object.keys(ALGO_INFO);

export default function AlgoSelector({ selected, onSelect, disabled }) {
  return (
    <div className="vs-card">
      <div className="vs-card-title">Select Algorithm</div>
      <div className="vs-algo-grid">
        {ALGOS.map(algo => (
          <button
            key={algo}
            className={`vs-algo-btn${selected === algo ? ' active' : ''}`}
            onClick={() => onSelect(algo)}
            disabled={disabled}
          >
            {ALGO_INFO[algo].name}
          </button>
        ))}
      </div>
    </div>
  );
}
