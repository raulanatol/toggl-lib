const withZero = value => value < 10 ? '0' + value : value;

export const humanizeMilliseconds = time => {
  const seconds = withZero(Math.floor((time / 1000) % 60));
  const minutes = withZero(Math.floor((time / (1000 * 60)) % 60));
  const hours = withZero(Math.floor((time / (1000 * 60 * 60)) % 24));
  return `${hours}:${minutes}:${seconds}`;
};

