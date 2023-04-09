export function decimalTwoPlaces(value: number | string): string {
  return (+value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function intToColor(num: number) {
  let hexStr = num.toString(16); // Convert to hexadecimal
  hexStr = hexStr.padStart(6, "0"); // Pad with leading zeros until the string is six characters long
  const red = parseInt(hexStr.slice(0, 2), 16); // Extract the red component from the first two characters of the string
  const green = parseInt(hexStr.slice(2, 4), 16); // Extract the green component from the next two characters of the string
  const blue = parseInt(hexStr.slice(4), 16); // Extract the blue component from the final two characters of the string
  return `rgb(${red}, ${green}, ${blue})`; // Return an RGB color value
}
