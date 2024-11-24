const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function customFetch(url: string, options?: RequestInit) {
  return fetch(BASE_URL + url, options);
}
