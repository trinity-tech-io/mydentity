/**
 * Adds a query param key and its value to n existing url.
 */
export function setQueryParameter(url: string, key: string, value: string): string {
  let myURL = new URL(url);
  let params = new URLSearchParams(myURL.search);

  params.set(key, value);
  myURL.search = params.toString();

  return myURL.toString();
}
