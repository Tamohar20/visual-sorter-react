export function getBubbleFrames(arr) {
  const a = [...arr], n = a.length, frames = [];
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      frames.push({ type: 'compare', indices: [j, j + 1], arr: [...a], msg: `Pass ${i+1}: Comparing a[${j}]=${a[j]} and a[${j+1}]=${a[j+1]}` });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        frames.push({ type: 'swap', indices: [j, j + 1], arr: [...a], msg: `Swapping a[${j}] ↔ a[${j+1}]` });
        swapped = true;
      }
    }
    frames.push({ type: 'sorted', indices: [n - 1 - i], arr: [...a], msg: `a[${n-1-i}]=${a[n-1-i]} placed in final position` });
    if (!swapped) break;
  }
  frames.push({ type: 'sorted', indices: [...Array(n).keys()], arr: [...a], msg: '✓ Array fully sorted!' });
  return frames;
}

export function getSelectionFrames(arr) {
  const a = [...arr], n = a.length, frames = [];
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      frames.push({ type: 'compare', indices: [minIdx, j], arr: [...a], msg: `Finding min in [${i}..${n-1}]: comparing a[${minIdx}]=${a[minIdx]} with a[${j}]=${a[j]}` });
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      frames.push({ type: 'swap', indices: [i, minIdx], arr: [...a], msg: `Placing minimum ${a[i]} at index ${i}` });
    }
    frames.push({ type: 'sorted', indices: [i], arr: [...a], msg: `Position ${i} sorted (value=${a[i]})` });
  }
  frames.push({ type: 'sorted', indices: [...Array(n).keys()], arr: [...a], msg: '✓ Array fully sorted!' });
  return frames;
}

export function getInsertionFrames(arr) {
  const a = [...arr], n = a.length, frames = [];
  frames.push({ type: 'sorted', indices: [0], arr: [...a], msg: 'a[0] is trivially sorted' });
  for (let i = 1; i < n; i++) {
    const key = a[i]; let j = i - 1;
    frames.push({ type: 'compare', indices: [i, j], arr: [...a], msg: `Inserting key=${key} from position ${i}` });
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      frames.push({ type: 'swap', indices: [j, j + 1], arr: [...a], msg: `Shifting a[${j}]=${a[j]} right` });
      j--;
    }
    a[j + 1] = key;
    frames.push({ type: 'sorted', indices: [...Array(i + 1).keys()], arr: [...a], msg: `Inserted ${key} at position ${j + 1}` });
  }
  return frames;
}

export function getMergeFrames(arr) {
  const a = [...arr], n = a.length, frames = [];
  function helper(l, r) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    helper(l, m); helper(m + 1, r);
    const L = a.slice(l, m + 1), R = a.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < L.length && j < R.length) {
      frames.push({ type: 'compare', indices: [l + i, m + 1 + j], arr: [...a], msg: `Merging: comparing ${L[i]} vs ${R[j]}` });
      if (L[i] <= R[j]) { a[k++] = L[i++]; } else { a[k++] = R[j++]; }
      frames.push({ type: 'overwrite', indices: [k - 1], arr: [...a], msg: `Placed ${a[k-1]} at position ${k-1}` });
    }
    while (i < L.length)  { a[k++] = L[i++]; frames.push({ type: 'overwrite', indices: [k-1], arr: [...a], msg: `Copied ${a[k-1]}` }); }
    while (j < R.length)  { a[k++] = R[j++]; frames.push({ type: 'overwrite', indices: [k-1], arr: [...a], msg: `Copied ${a[k-1]}` }); }
    for (let x = l; x <= r; x++)
      frames.push({ type: 'sorted', indices: [x], arr: [...a], msg: `Subarray [${l}..${r}] merged` });
  }
  helper(0, n - 1);
  return frames;
}

export function getQuickFrames(arr) {
  const a = [...arr], n = a.length, frames = [];
  function partition(lo, hi) {
    const pivot = a[hi];
    frames.push({ type: 'pivot', indices: [hi], arr: [...a], msg: `Pivot = ${pivot} at index ${hi}` });
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      frames.push({ type: 'compare', indices: [j, hi], arr: [...a], msg: `Comparing a[${j}]=${a[j]} with pivot=${pivot}` });
      if (a[j] <= pivot) {
        i++;
        if (i !== j) { [a[i], a[j]] = [a[j], a[i]]; frames.push({ type: 'swap', indices: [i, j], arr: [...a], msg: `Swapping a[${i}] ↔ a[${j}]` }); }
      }
    }
    [a[i + 1], a[hi]] = [a[hi], a[i + 1]];
    frames.push({ type: 'swap', indices: [i + 1, hi], arr: [...a], msg: `Pivot ${pivot} → final position ${i+1}` });
    frames.push({ type: 'sorted', indices: [i + 1], arr: [...a], msg: `a[${i+1}]=${pivot} in final sorted position` });
    return i + 1;
  }
  function qs(lo, hi) {
    if (lo < hi) { const pi = partition(lo, hi); qs(lo, pi - 1); qs(pi + 1, hi); }
    else if (lo === hi) frames.push({ type: 'sorted', indices: [lo], arr: [...a], msg: `Single element a[${lo}]=${a[lo]} is sorted` });
  }
  qs(0, n - 1);
  return frames;
}

export function getCountingFrames(arr) {
  const a = [...arr], n = a.length, frames = [];
  const max = Math.max(...a);
  const count = new Array(max + 1).fill(0);
  for (let i = 0; i < n; i++) {
    count[a[i]]++;
    frames.push({ type: 'compare', indices: [i], arr: [...a], msg: `Counting a[${i}]=${a[i]} → count[${a[i]}]=${count[a[i]]}` });
  }
  let idx = 0;
  for (let v = 0; v <= max; v++) {
    while (count[v]-- > 0) {
      a[idx] = v;
      frames.push({ type: 'overwrite', indices: [idx], arr: [...a], msg: `Placing value ${v} at position ${idx}` });
      frames.push({ type: 'sorted', indices: [idx], arr: [...a], msg: `a[${idx}] = ${v}` });
      idx++;
    }
  }
  return frames;
}

export const GENERATORS = {
  bubble:    getBubbleFrames,
  selection: getSelectionFrames,
  insertion: getInsertionFrames,
  merge:     getMergeFrames,
  quick:     getQuickFrames,
  counting:  getCountingFrames,
};
