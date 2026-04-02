import { CODE_SNIPPETS } from '../utils/algoInfo';

const LANGS = ['c', 'cpp', 'java', 'python'];
const LANG_LABELS = { c: 'C', cpp: 'C++', java: 'Java', python: 'Python' };

export default function CodePanel({ algo, lang, onSetLang }) {
  const html = CODE_SNIPPETS[algo]?.[lang] || '// Code not available';
  const lines = html.split('\n');

  return (
    <div className="vs-card">
      <div className="vs-card-title">Algorithm Code</div>

      <div className="vs-lang-tabs">
        {LANGS.map(l => (
          <button
            key={l}
            className={`vs-lang-tab${lang === l ? ' active' : ''}`}
            onClick={() => onSetLang(l)}
          >
            {LANG_LABELS[l]}
          </button>
        ))}
      </div>

      <div className="vs-code-block">
        {lines.map((line, i) => (
          <span
            key={i}
            className="vs-code-line"
            dangerouslySetInnerHTML={{ __html: line || ' ' }}
          />
        ))}
      </div>
    </div>
  );
}
