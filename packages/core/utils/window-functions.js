// taken from d3-array
function compare(a, b) {
  // eslint-disable-next-line no-nested-ternary
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
export function firstIndexAbove({
  value,
  data,
  key = "label",
  lo = 0,
  hi = data.length,
}) {
  while (lo < hi) {
    const mid = (lo + hi) >>> 1; // eslint-disable-line
    // eslint-disable-next-line no-param-reassign
    if (compare(+data[mid][key], value) < 0) lo = mid + 1;
    else hi = mid; // eslint-disable-line
  }
  return lo;
}

export function windowIndices({
  value,
  data,
  key = "label",
  lowestValue = -Infinity,
  highestValue = Infinity,
}) {
  const lo = firstIndexAbove({ data, value: lowestValue, key });
  const hi = firstIndexAbove({ data, value: highestValue, key });

  let current;
  let previous;
  let next;
  const candidate = firstIndexAbove({ value, data, key });

  if (candidate <= lo) {
    // left edge
    previous = lo;
    current = lo;
  } else if (candidate > hi) {
    previous = hi - 1;
    current = hi;
  } else if (candidate === data.length) {
    // right edge
    previous = candidate - 2;
    current = candidate - 1;
    next = candidate - 1;
    return { previous, current, next };
  } else {
    const pv = value - data[candidate - 1][key];
    const distance = data[candidate][key] - data[candidate - 1][key];
    if (pv > distance / 2) {
      current = candidate;
    } else {
      current = candidate - 1;
    }
    previous = Math.max(lo, current - 1);
  }
  next = Math.min(hi - 1, current + 1);
  return { previous, current, next };
}

export function window1D({
  value,
  data,
  key = "label",
  lowestValue = -Infinity,
  highestValue = Infinity,
}) {
  const { previous, current, next } = windowIndices({
    value,
    data,
    key,
    lowestValue,
    highestValue,
  });
  return {
    previousIndex: previous,
    currentIndex: current,
    nextIndex: next,
    previous: data[previous],
    current: data[current],
    next: data[next],
    leftBoundary: previous === current,
    rightBoundary: next === current,
  };
}

function isDate(dt) {
  return Object.prototype.toString.call(dt) === "[object Date]";
}

export function window1DPlacement({
  value,
  data,
  key = "label",
  lowestValue = -Infinity,
  highestValue = Infinity,
  pad = 0.5,
  scale = (x) => x,
}) {
  const { previous, current, next } = window1D({
    value,
    data,
    key,
    lowestValue,
    highestValue,
  });
  const p = previous[key];
  const c = current[key];
  const n = next[key];
  let t = (_) => _;
  if (isDate(p) && isDate(c) && isDate(n)) {
    t = (dt) => new Date(dt);
  }
  const leftWindow = (c - p) * pad;
  const rightWindow = (n - c) * pad;
  const start = +c - leftWindow;
  const end = +c + rightWindow;
  const width = end - start;
  return {
    start,
    end,
    width,
    rangeStart: scale(t(start)),
    rangeEnd: scale(t(end)),
    rangeWidth: scale(t(end)) - scale(t(start)),
  };
}
