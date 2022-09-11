import { useRefreshTokenMutation } from '~/generated/graphql';
import { cookies } from './cookies';

export const getNewToken = async () => {
  const [refreshToken] = useRefreshTokenMutation();
  const token = cookies.get('auth.token');
  try {
    const response = await refreshToken({
      variables: {
        oldToken: token,
      },
    });
    cookies.set('auth.refreshToken', response.data.refreshToken.token);
    cookies.set('auth.token', response.data.refreshToken.token);
    return response.data.refreshToken.token;
  } catch (err) {
    cookies.remove('auth.refreshToken', { path: '/', maxAge: 60 * 60 * 24 * 30 });
    console.log(err);
    throw err;
  }
};
