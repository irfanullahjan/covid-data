export function decimalTwoPlaces(value: number | string): string {
  return (+value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
