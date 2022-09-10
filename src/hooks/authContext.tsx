import { createContext, ReactNode, useContext, useState } from 'react';
import { useLoginMutation, useUpdateUserMutation } from '~/generated/graphql';
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
  handleUpdate(data: DataUpdateUser): Promise<void>;
  isAuthenticated: boolean;
  user: User | undefined;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;
  const [login] = useLoginMutation();
  const [updateUser] = useUpdateUserMutation();

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
      cookies.set('auth.token', token, { path: '/', maxAge: 60 * 60 * 24 * 30 });
      window.localStorage.setItem('user.name', name.toString());
      window.localStorage.setItem('user.photoUrl', photoUrl.toString());
      cookies.set('id.user', id, { path: '/', maxAge: 60 * 60 * 24 * 30 });
      setUser({
        id: id,
        name: name,
        email: email,
        photoUrl: photoUrl,
      });
      window.location.href = '/profile';
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
    console.log(response);
    // const response = await updateUserMutation({
    //   variables: {
    //     id: data.id,
    //     data: {
    //       name: data?.name,
    //       password: data?.password,
    //       photoUrl: data?.photoUrl,
    //     },
    //   },
    // });
    // window.localStorage.setItem('user.name', response.data.updateUser.name.toString());
    // window.localStorage.setItem('user.photoUrl', response.data.updateUser.photoUrl.toString());
    // if (response.errors) {
    //   console.log(response.errors);
    // }
    // console.log(response);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user, handleUpdate }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
