export function decimalTwoPlaces(value: number | string): string {
  return (+value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatToThousandsMillions(num: number): string {
  if (num >= 1000000) {
    return `${Math.round(num / 1000000)}M`;
  }
  if (num >= 1000) {
    return `${Math.round(num / 1000)}K`;
  }
  return Math.round(num).toString();
}
