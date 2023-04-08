import { cookies } from "next/headers";
import { BASE_URL } from "../../constants";
import { fetchJson } from "./fetchJson";

export function fetchServerSide(input: RequestInfo | URL, init?: RequestInit) {
  if (typeof input === "string" && !input.startsWith("http")) {
    input = new URL(`/api${input}`, BASE_URL);
  }
  const headers = new Headers(init?.headers);
  const jwt = cookies().get("jwt")?.value;
  if (jwt) {
    headers.set("Authorization", `Bearer ${jwt}`);
  }
  return fetchJson(input, { ...init, headers });
}
