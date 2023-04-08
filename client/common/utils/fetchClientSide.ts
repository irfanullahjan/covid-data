import { BASE_URL } from "../../constants";

export function fetchClientSide(input: RequestInfo | URL, init?: RequestInit) {
  if (typeof input === "string" && !input.startsWith("http")) {
    input = new URL(`/api${input}`, BASE_URL);
  }
  return fetch(input, init);
}

export function fetchJsonClientSide(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  return fetchClientSide(input, init).then((response) => response.json());
}
