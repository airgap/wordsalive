export const hashcol = (word: string): [string, string] => {
  const hash = Array.from(word).reduce(
    (h, c) => (Math.imul(31, h) + c.charCodeAt(0)) | 0,
    0,
  );
  const hue = (hash >>> 0) % 360;
  const dark = `hsl(${hue}, 70%, 10%)`;
  const light = `hsl(${(hue + 180) % 360}, 90%, 90%)`;
  return [dark, light];
};
