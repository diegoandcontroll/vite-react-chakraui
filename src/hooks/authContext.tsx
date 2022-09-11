import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import {
  useLoginMutation,
  useRefreshTokenMutation,
  useUpdateUserMutation,
} from '~/generated/graphql';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
interface AuthProviderProps {
  children: ReactNode;
}
type User = {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
};

type Data = {
  emailData: string;
  password: string;
};
type DataUpdateUser = {
  id: string;
  name?: string;
  photoUrl?: string;
  password?: string;
};

type AuthContextData = {
  signIn(data: Data): Promise<void>;
  isAuthenticated: boolean;
  user: User | undefined;
  handleUpdate(data: DataUpdateUser): Promise<void>;
  signOut: () => void;
  refreshToken(oldToken: string): Promise<void>;
};
export const signOut = () => {
  cookies.remove('auth.token', { maxAge: 0, path: '' });
  cookies.remove('id.user', { maxAge: 0, path: '' });
};
const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);

  const isAuthenticated = !!user;
  const [login] = useLoginMutation();
  const [updateUser] = useUpdateUserMutation();
  useEffect(() => {
    setUser({
      id: window.localStorage.getItem('user.id'),
      email: window.localStorage.getItem('user.email'),
      name: window.localStorage.getItem('user.name'),
      photoUrl: window.localStorage.getItem('user.photoUrl'),
    });
  }, []);
  async function signIn({ emailData, password }: Data) {
    try {
      const response = await login({
        fetchPolicy: 'network-only',
        variables: {
          data: {
            email: emailData,
            password,
          },
        },
      });
      const { id, photoUrl, name, email } = response.data.login.user;
      const token = response.data.login.token;
      cookies.set('auth.token', token || '', { path: '/', maxAge: 60 * 60 * 24 * 30 });
      cookies.set('id.user', id, { path: '/', maxAge: 60 * 60 * 24 * 30 });
      window.localStorage.setItem('user.name', name.toString());
      window.localStorage.setItem('user.photoUrl', photoUrl.toString());
      window.localStorage.setItem('user.id', id.toString());
      window.localStorage.setItem('user.email', email.toString());
      setUser({
        id: id,
        name: name,
        email: email,
        photoUrl: photoUrl,
      });

      // window.location.href = '/profile';
    } catch (error) {
      console.log(error);
    }
  }
  async function handleUpdate(data: DataUpdateUser) {
    const response = await updateUser({
      fetchPolicy: 'network-only',
      variables: {
        id: data.id,
        data: {
          name: data.name,
          password: data.password,
          photoUrl: data.photoUrl,
        },
      },
    });
    const { id, photoUrl, name, email } = response.data.updateUser;
    setUser({
      id: id,
      name: name,
      email: email,
      photoUrl: photoUrl,
    });
    window.localStorage.setItem('user.photoUrl', response.data.updateUser.photoUrl.toString());
    window.localStorage.setItem('user.name', response.data.updateUser.name.toString());
    window.localStorage.setItem('user.name', name.toString());
    window.localStorage.setItem('user.photoUrl', photoUrl.toString());
  }
  async function refreshToken(oldToken: string) {
    const [refreshToken] = useRefreshTokenMutation();

    const response = await refreshToken({
      variables: {
        oldToken: oldToken,
      },
    });
    cookies.set('auth.token', response.data.refreshToken.token || '');
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, signIn, user, handleUpdate, signOut, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
