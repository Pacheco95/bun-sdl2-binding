const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

export const hexToRgba = (color: string, alpha?: number): number[] => {
  color = color.charAt(0) === "#" ? color.slice(1) : color;

  let r = 255;
  let g = 255;
  let b = 255;
  let a = 255;

  if (color.length === 8) {
    r = parseInt(color.slice(0, 2), 16);
    g = parseInt(color.slice(2, 4), 16);
    b = parseInt(color.slice(4, 6), 16);
    a = parseInt(color.slice(6, 8), 16);
  } else if (color.length === 6) {
    r = parseInt(color.slice(0, 2), 16);
    g = parseInt(color.slice(2, 4), 16);
    b = parseInt(color.slice(4, 6), 16);
  } else if (color.length === 4) {
    r = parseInt(color.charAt(0) + color.charAt(0), 16);
    g = parseInt(color.charAt(1) + color.charAt(1), 16);
    b = parseInt(color.charAt(2) + color.charAt(2), 16);
    a = parseInt(color.charAt(3) + color.charAt(3), 16);
  } else if (color.length === 3) {
    r = parseInt(color.charAt(0) + color.charAt(0), 16);
    g = parseInt(color.charAt(1) + color.charAt(1), 16);
    b = parseInt(color.charAt(2) + color.charAt(2), 16);
  } else {
    throw new Error("Invalid hexadecimal color string");
  }

  a = isNumeric(alpha) ? alpha! : a;

  return [r, g, b, a];
};
