export function setLocalStorageItem(key: string, value: string) {
  const localStorage = window.localStorage;

  localStorage.setItem(key, value);
}

export function getItemLocalStorage(key: string) {
  const localStorage = window.localStorage;

  return localStorage.getItem(key);
}
