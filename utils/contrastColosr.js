function getContrastColor(hex) {
  // Remove the '#' if present
  hex = hex.replace("#", "");

  // Convert r, g, b
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate luminance
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  // If luminance is high, return black; otherwise, return white
  return luminance > 186 ? "#000000" : "#ffffff";
}

export default getContrastColor;
