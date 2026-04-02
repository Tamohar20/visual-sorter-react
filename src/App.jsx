import { useState, useEffect, useCallback } from 'react';
import Header          from './components/Header';
import ArrayInput      from './components/ArrayInput';
import AlgoSelector    from './components/AlgoSelector';
import Visualizer      from './components/Visualizer';
import ComplexityPanel from './components/ComplexityPanel';
import CodePanel       from './components/CodePanel';
import SidePanel       from './components/SidePanel';
import Toast, { useToast } from './components/Toast';
import { useSorter }   from './hooks/useSorter';

export default function App() {
  const [lightMode,    setLightMode]    = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState('bubble');
  const [selectedLang, setSelectedLang] = useState('c');
  const [speed,        setSpeedState]   = useState('medium');

  const {
    array, bars, highlights,
    comparisons, swaps,
    stepMsg, isRunning, isPaused,
    status, sortLog, compResults,
    startSort, pauseResume, step, reset,
    generateRandom, applyCustom, setSpeed,
    runComparison, setArray,
  } = useSorter();

  const { toast, showToast } = useToast();

  // ---- Theme toggle ----
  function toggleTheme() {
    setLightMode(prev => {
      const next = !prev;
      document.documentElement.classList.toggle('light-mode', next);
      document.body.classList.toggle('light-mode', next);
      return next;
    });
  }

  // ---- Algo selection (disabled while running) ----
  function handleSelectAlgo(algo) {
    if (isRunning) return;
    setSelectedAlgo(algo);
  }

  // ---- Generate random ----
  function handleGenerate(size) {
    generateRandom(size);
    showToast(`Generated ${size} random elements`);
  }

  // ---- Apply custom array ----
  function handleApply(raw) {
    const result = applyCustom(raw);
    if (result === null) return null;
    showToast(`Loaded ${result.length} elements`);
    return result;
  }

  // ---- Start sort ----
  function handleStart() {
    if (isRunning) return;
    startSort(selectedAlgo, array);
  }

  // ---- Step ----
  function handleStep() {
    step(selectedAlgo, array);
  }

  // ---- Reset ----
  function handleReset() {
    reset(array);
    showToast('Reset complete');
  }

  // ---- Speed ----
  function handleSetSpeed(s) {
    setSpeedState(s);
    setSpeed(s);
  }

  // ---- Load saved array (from SidePanel) ----
  function handleLoadArray(arr) {
    setArray(arr);
    reset(arr);
    showToast(`Loaded ${arr.length} elements`, 'success');
  }

  // ---- Run comparison ----
  function handleRunComparison(arr) {
    const results = runComparison(arr);
    showToast('Comparison complete!', 'success');
    return results;
  }

  // ---- Keyboard shortcuts ----
  useEffect(() => {
    function onKey(e) {
      if (e.target.tagName === 'INPUT') return;
      if (e.code === 'Space')      { e.preventDefault(); isRunning ? pauseResume() : handleStart(); }
      if (e.code === 'KeyR'  && !isRunning) handleReset();
      if (e.code === 'ArrowRight') handleStep();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isRunning, isPaused, selectedAlgo, array]);

  return (
    <div className={lightMode ? 'light-mode' : ''}>
      {/* ── Header ── */}
      <Header lightMode={lightMode} onToggleTheme={toggleTheme} />

      <div className="vs-main">
        {/* ══════════ LEFT COLUMN ══════════ */}
        <div className="vs-left">

          {/* Array Input */}
          <ArrayInput
            onApply={handleApply}
            onGenerate={handleGenerate}
            disabled={isRunning && !isPaused}
          />

          {/* Algorithm Selector */}
          <AlgoSelector
            selected={selectedAlgo}
            onSelect={handleSelectAlgo}
            disabled={isRunning}
          />

          {/* Visualizer (bar chart + controls) */}
          <Visualizer
            bars={bars}
            highlights={highlights}
            comparisons={comparisons}
            swaps={swaps}
            isRunning={isRunning}
            isPaused={isPaused}
            status={status}
            stepMsg={stepMsg}
            speed={speed}
            onSetSpeed={handleSetSpeed}
            onStart={handleStart}
            onPauseResume={pauseResume}
            onStep={handleStep}
            onReset={handleReset}
          />

          {/* Step message box */}
          <div className="vs-step-info">{stepMsg}</div>

          {/* Complexity details */}
          <ComplexityPanel algo={selectedAlgo} />

          {/* Code panel */}
          <CodePanel
            algo={selectedAlgo}
            lang={selectedLang}
            onSetLang={setSelectedLang}
          />

        </div>

        {/* ══════════ RIGHT SIDE PANEL ══════════ */}
        <SidePanel
          array={array}
          compResults={compResults}
          sortLog={sortLog}
          onRunComparison={handleRunComparison}
          onLoadArray={handleLoadArray}
          isRunning={isRunning}
        />
      </div>

      {/* Toast notification */}
      <Toast toast={toast} />
    </div>
  );
}
