import { useState, useRef, useCallback } from 'react';
import { GENERATORS } from '../utils/algorithms';

const SPEEDS = { slow: 220, medium: 80, fast: 22, turbo: 4 };

function makeRandom(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
}

export function useSorter() {
  const [array, setArray]             = useState(() => makeRandom(30));
  const [bars, setBars]               = useState(() => makeRandom(30));  
  const [highlights, setHighlights]   = useState({});                   
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps]             = useState(0);
  const [stepMsg, setStepMsg]         = useState('Step-by-step mode: click ⏭ Step to advance.');
  const [isRunning, setIsRunning]     = useState(false);
  const [isPaused, setIsPaused]       = useState(false);
  const [status, setStatus]           = useState({ state: 'idle', msg: 'Ready — select algorithm and press Start' });
  const [sortLog, setSortLog]         = useState([]);
  const [compResults, setCompResults] = useState({});

  const animationsRef  = useRef([]);
  const animIdxRef     = useRef(0);
  const timerRef       = useRef(null);
  const sortedRef      = useRef(new Set());
  const comparisonsRef = useRef(0);
  const swapsRef       = useRef(0);
  const speedRef       = useRef('medium');
  const isRunningRef   = useRef(false);
  const isPausedRef    = useRef(false);

  const applyFrame = useCallback((frame) => {
    const h = { sorted: new Set(sortedRef.current) };
    switch (frame.type) {
      case 'compare':
        h.compare = new Set(frame.indices);
        comparisonsRef.current++;
        setComparisons(comparisonsRef.current);
        break;
      case 'swap':
        h.swap = new Set(frame.indices);
        swapsRef.current++;
        setSwaps(swapsRef.current);
        break;
      case 'sorted':
        frame.indices.forEach(i => sortedRef.current.add(i));
        h.sorted = new Set(sortedRef.current);
        break;
      case 'pivot':
        h.pivot = new Set(frame.indices);
        break;
      case 'overwrite':
        h.active = new Set(frame.indices);
        break;
    }
    setBars([...frame.arr]);
    setHighlights(h);
    setStepMsg(frame.msg || '');
  }, []);

  const tick = useCallback(() => {
    if (!isRunningRef.current || isPausedRef.current) return;
    if (animIdxRef.current >= animationsRef.current.length) {
      finish();
      return;
    }
    applyFrame(animationsRef.current[animIdxRef.current]);
    animIdxRef.current++;
    timerRef.current = setTimeout(tick, SPEEDS[speedRef.current]);
  }, [applyFrame]);

  const finish = useCallback(() => {
    clearTimeout(timerRef.current);
    isRunningRef.current = false;
    isPausedRef.current  = false;
    setIsRunning(false);
    setIsPaused(false);
    const last = animationsRef.current[animationsRef.current.length - 1];
    if (last) {
      last.arr.forEach((_, i) => sortedRef.current.add(i));
      setBars([...last.arr]);
      setHighlights({ sorted: new Set(sortedRef.current) });
    }
    setStatus({ state: 'done', msg: `✓ Done — ${comparisonsRef.current} comparisons, ${swapsRef.current} swaps` });
  }, []);

  const startSort = useCallback((algo, arr) => {
    if (isRunningRef.current) return;
    sortedRef.current.clear();
    comparisonsRef.current = 0;
    swapsRef.current       = 0;
    setComparisons(0);
    setSwaps(0);
    setBars([...arr]);
    setHighlights({});

    animationsRef.current = GENERATORS[algo]([...arr]);
    animIdxRef.current    = 0;
    isRunningRef.current  = true;
    isPausedRef.current   = false;
    setIsRunning(true);
    setIsPaused(false);
    setStatus({ state: 'running', msg: `Sorting with ${algo}…` });

    setSortLog(prev => {
      const entry = `[${new Date().toLocaleTimeString()}] ${algo} · n=${arr.length}`;
      const updated = [entry, ...prev].slice(0, 10);
      return updated;
    });

    timerRef.current = setTimeout(tick, SPEEDS[speedRef.current]);
  }, [tick]);

  const pauseResume = useCallback(() => {
    if (!isRunningRef.current) return;
    if (isPausedRef.current) {
      isPausedRef.current = false;
      setIsPaused(false);
      setStatus({ state: 'running', msg: 'Resumed…' });
      timerRef.current = setTimeout(tick, SPEEDS[speedRef.current]);
    } else {
      isPausedRef.current = true;
      setIsPaused(true);
      clearTimeout(timerRef.current);
      setStatus({ state: 'paused', msg: 'Paused — click Resume to continue' });
    }
  }, [tick]);

  const step = useCallback((algo, arr) => {
    if (!isRunningRef.current) {
      sortedRef.current.clear();
      comparisonsRef.current = 0;
      swapsRef.current       = 0;
      setComparisons(0);
      setSwaps(0);
      setBars([...arr]);
      setHighlights({});
      animationsRef.current = GENERATORS[algo]([...arr]);
      animIdxRef.current    = 0;
      isRunningRef.current  = true;
      isPausedRef.current   = true;
      setIsRunning(true);
      setIsPaused(true);
      setStatus({ state: 'paused', msg: 'Step mode — press ⏭ to advance' });
    }
    if (!isPausedRef.current) {
      isPausedRef.current = true;
      setIsPaused(true);
      clearTimeout(timerRef.current);
    }
    if (animIdxRef.current >= animationsRef.current.length) { finish(); return; }
    applyFrame(animationsRef.current[animIdxRef.current++]);
    setStatus({ state: 'paused', msg: `Step ${animIdxRef.current} / ${animationsRef.current.length}` });
  }, [applyFrame, finish]);

  const reset = useCallback((arr) => {
    clearTimeout(timerRef.current);
    isRunningRef.current  = false;
    isPausedRef.current   = false;
    sortedRef.current.clear();
    comparisonsRef.current = 0;
    swapsRef.current       = 0;
    animationsRef.current  = [];
    animIdxRef.current     = 0;
    setIsRunning(false);
    setIsPaused(false);
    setComparisons(0);
    setSwaps(0);
    setBars([...arr]);
    setArray([...arr]);
    setHighlights({});
    setStepMsg('Step-by-step mode: click ⏭ Step to advance one step at a time.');
    setStatus({ state: 'idle', msg: 'Ready — select algorithm and press Start' });
  }, []);

  const generateRandom = useCallback((size) => {
    const a = makeRandom(size);
    setArray(a);
    reset(a);
  }, [reset]);

  const applyCustom = useCallback((raw) => {
    const parsed = raw.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0 && n <= 999);
    if (parsed.length < 2 || parsed.length > 100) return null;
    setArray(parsed);
    reset(parsed);
    return parsed;
  }, [reset]);

  const setSpeed = useCallback((s) => { speedRef.current = s; }, []);

  const runComparison = useCallback((arr) => {
    const results = {};
    Object.keys(GENERATORS).forEach(algo => {
      const t0 = performance.now();
      GENERATORS[algo]([...arr]);
      results[algo] = +(performance.now() - t0).toFixed(3);
    });
    setCompResults(results);
    return results;
  }, []);

  return {
    array, bars, highlights, comparisons, swaps,
    stepMsg, isRunning, isPaused, status,
    sortLog, compResults,
    startSort, pauseResume, step, reset,
    generateRandom, applyCustom, setSpeed, runComparison,
    setArray,
  };
}
