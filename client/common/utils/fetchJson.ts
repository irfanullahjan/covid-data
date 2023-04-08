export function fetchJson(input: RequestInfo | URL, init?: RequestInit) {
  return fetch(input, init).then((res) => {
    if (!res.ok) {
      console.error(`Error fetching ${input}: ${res.status} ${res.statusText}`);
      return null;
    }
    return res.json();
  });
}
