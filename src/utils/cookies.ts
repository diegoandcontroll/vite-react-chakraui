import { useCookies } from 'react-cookie';

export const useAuthToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['auth.token']);

  // this function allows to save any string in our cookies, under the key "authToken"
  const setAuthToken = (authToken: string) => setCookie('auth.token', authToken);

  //this function removes the key "authToken" from our cookies. Useful to logout
  const removeAuthToken = () => removeCookie('auth.token');

  return [cookies['auth.token'], setAuthToken, removeAuthToken];
};
