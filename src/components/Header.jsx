export default function Header({ lightMode, onToggleTheme }) {
  return (
    <header className="vs-header">
      <div className="vs-logo">
        <div className="vs-logo-icon">⚡</div>
        <div className="vs-logo-text">
          Visual<span>Sorter</span>
        </div>
      </div>
      <button className="vs-theme-btn" onClick={onToggleTheme}>
        {lightMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
    </header>
  );
}
