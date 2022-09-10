import { useRefreshTokenMutation } from '~/generated/graphql';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const getNewToken = async () => {
  const [refreshToken] = useRefreshTokenMutation();
  const token = cookies.get('auth.token');
  console.log(token);
  try {
    const response = await refreshToken({
      fetchPolicy: 'network-only',
      variables: {
        oldToken: token,
      },
    });
    cookies.set('auth.token', response?.data.refreshToken.token || '', { maxAge: 0, path: '' });
    return response?.data.refreshToken.token;
  } catch (err) {
    console.log(token);
    cookies.remove('auth.token', { path: '/', maxAge: 60 * 60 * 24 * 30 });
    throw err;
  }
};
