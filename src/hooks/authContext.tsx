import { createContext, ReactNode, useContext, useState } from 'react';
import { useLoginMutation } from '~/generated/graphql';
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
type AuthContextData = {
  signIn(data: Data): Promise<void>;
  isAuthenticated: boolean;
  user: User | undefined;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;
  const [login] = useLoginMutation();

  async function signIn({ emailData, password }: Data) {
    try {
      const response = await login({
        variables: {
          data: {
            email: emailData,
            password,
          },
        },
      });
      const { id, photoUrl, name, email } = response.data.login.user;
      const token = response.data.login.token;
      cookies.set('auth.token', token, { path: '/', maxAge: 60 * 60 * 24 * 30 });
      setUser({
        email,
        id,
        photoUrl,
        name,
      });
    } catch (error) {
      console.log(error);
    }
  }
  // async function signOut() {
  //   cookies.remove('auth.token', { path: '/', maxAge: 60 * 60 * 24 * 30 });
  // }
  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
