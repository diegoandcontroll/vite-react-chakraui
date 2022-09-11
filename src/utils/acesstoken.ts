export let acessToken: string;
export let isLogged = false;
export const setAcessToken = (v: string) => {
  acessToken = v;
};

export const getAcessToken = () => {
  return acessToken;
};

export const setIsLogged = (v: boolean) => {
  isLogged = v;
};

export const getIsLogged = () => {
  return isLogged;
};
