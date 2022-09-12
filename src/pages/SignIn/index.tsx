import { chakra, SimpleGrid, Button, Input, FormLabel } from '@chakra-ui/react';

import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { useLoginMutation } from '~/generated/graphql';

import { cookies } from '~/utils/cookies';

import { setLocalStorageItem } from '~/utils/localtorage';

export const SignIn = ({ history }: RouteComponentProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useLoginMutation();
  async function handleSignIn(email: string, password: string) {
    try {
      const response = await login({
        fetchPolicy: 'network-only',
        errorPolicy: 'none',
        variables: {
          data: {
            email,
            password,
          },
        },
      });

      const { id, email: emailData, name, photoUrl } = response.data.login.user;
      setLocalStorageItem('id', id);
      setLocalStorageItem('email', emailData);
      setLocalStorageItem('name', name);
      setLocalStorageItem('photoUrl', photoUrl);
      setLocalStorageItem('isLogged', 'ON');
      cookies.set('auth.token', response.data.login.token);

      window.location.href = '/profile';
    } catch (error) {
      history.push('/');
      console.log(error);
    }
  }
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    try {
      await handleSignIn(email, password);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SimpleGrid
      columns={{
        base: 1,
        md: 1,
      }}
      spacing='0'
    >
      <chakra.form
        onSubmit={(e: any) => handleSubmit(e)}
        as='form'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        w='full'
        py={32}
        zIndex={3}
        bg='gray.300'
        _dark={{ bgGradient: 'linear(to-b, #fc45a9, #c64089, #6945fc)' }}
      >
        <chakra.h1
          mb={4}
          fontSize={{
            base: '4xl',
            md: '4xl',
            lg: '5xl',
          }}
          fontWeight='bold'
          color='brand.600'
          _dark={{
            color: 'white',
          }}
          lineHeight='shorter'
          textShadow='2px 0 currentcolor'
          textAlign='center'
        >
          Login
        </chakra.h1>
        <SimpleGrid
          columns={1}
          px={6}
          py={4}
          spacing={4}
          color='gray.200'
          _dark={{
            color: 'gray.700',
          }}
        >
          <FormLabel _dark={{ color: 'white', fontWeight: '800' }} color='black'>
            E-mail
          </FormLabel>
          <Input
            mt={-4}
            type='email'
            placeholder='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            borderColor='gray.700'
            color='black'
            _dark={{
              color: 'white',
              borderColor: 'gray.300',
            }}
          />
          <FormLabel _dark={{ color: 'white', fontWeight: '800' }} color='black'>
            Password
          </FormLabel>
          <Input
            mt={-4}
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            borderColor='gray.700'
            placeholder='Password'
            color='black'
            _dark={{
              color: 'white',
              borderColor: 'gray.300',
            }}
          />
          <Button
            colorScheme='brand'
            color='black'
            w='full'
            py={2}
            my={2}
            type='submit'
            _dark={{
              bg: 'gray.200',
            }}
            border='1px solid'
            borderColor='gray.700'
            _hover={{
              bg: 'gray.500',
              _dark: { bg: 'gray.400' },
            }}
          >
            Login now
          </Button>
        </SimpleGrid>
      </chakra.form>
    </SimpleGrid>
  );
};
