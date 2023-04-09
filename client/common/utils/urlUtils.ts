export function formatParamArrayToString(name: string, arr: string[]): string {
  return arr.map((a) => `${name}[]=${a}`).join("&");
}
