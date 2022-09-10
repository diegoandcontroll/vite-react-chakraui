function getCookie(name: string) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export const token = getCookie('auth.token');

export const isLogged = !!token;

export function setLocalStorage(keys: string[], values: string[]) {
  keys.map((key) => values.map((value) => window.localStorage.setItem(key, value)));
}
