import { useHistory } from 'react-router-dom';
import { useLoginMutation } from '~/generated/graphql';
import { useAuthToken } from './cookiesAuth';
import { setLocalStorageItem } from './localtorage';

const [login] = useLoginMutation();
const [_, setAuthToken] = useAuthToken();
const history = useHistory();
export async function signIn(email: string, password: string) {
  try {
    const response = await login({
      fetchPolicy: 'network-only',
      variables: {
        data: {
          email,
          password,
        },
      },
    });
    if (response.data?.login) {
      const { id, email: emailData, name, photoUrl } = response.data.login.user;
      setLocalStorageItem('id', id);
      setLocalStorageItem('email', emailData);
      setLocalStorageItem('name', name);
      setLocalStorageItem('photoUrl', photoUrl);
      setAuthToken(response.data.login.token);
      history.push('/');
    } else {
      console.log('hello');
    }
  } catch (error) {
    console.log('Hellow');
    console.log(error);
  }
}
