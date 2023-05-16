export function generateRandomColors(length: number) {
  const colors = [];

  for (let i = 0; i < length; i++) {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const alpha = Math.random().toFixed(2);

    const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    colors.push(rgbaColor);
  }

  return colors;
}
