import { Box, Flex, chakra, WrapItem, Avatar, Spinner, HStack } from '@chakra-ui/react';

import { RouteComponentProps } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { ModalUpdateProfile } from '~/components/Modal';
import { useUserQuery } from '~/generated/graphql';

export const Profile = ({ history }: RouteComponentProps) => {
  const cookies = new Cookies();
  const idUser = cookies.get('id.user');

  const { data, error, loading } = useUserQuery({
    variables: {
      id: idUser,
    },
    fetchPolicy: 'network-only',
  });

  if (error) {
    console.log(error);
    history.push('/');

    return <div>Error</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }
  if (loading) {
    <Box display='flex' justifyContent='center' alignItems='center'>
      <Spinner />
    </Box>;
  }
  return (
    <Flex
      w='full'
      bg='gray.400'
      _dark={{
        bg: 'gray.700',
      }}
      p={50}
      alignItems='center'
      justifyContent='center'
    >
      <Box
        minW='7xl'
        px={4}
        py={8}
        mx='auto'
        textAlign={{
          base: 'left',
          md: 'center',
        }}
        bg='gray.200'
        _dark={{
          bg: 'gray.500',
        }}
        rounded='md'
        shadow='base'
      >
        <Box
          px={[0, 4]}
          py={20}
          borderWidth='1'
          color='gray.100'
          _dark={{
            color: 'gray.700',
          }}
        >
          <Box
            w={['full', '100%']}
            mx='auto'
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            {loading && (
              <Box display='flex' justifyContent='center' alignItems='center'>
                <Spinner />
              </Box>
            )}
            <HStack>
              <WrapItem display='flex' justifyContent='center' alignItems='center' pr='5'>
                <Avatar name={data.user.name} src={data.user.photoUrl} />
              </WrapItem>
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
              >
                <chakra.h3 mr='28' ml='2'>
                  Name: <chakra.span>{data.user?.name}</chakra.span>
                </chakra.h3>
                <chakra.h3>
                  Email: <chakra.span>{data.user?.email}</chakra.span>
                </chakra.h3>
              </Box>
            </HStack>
          </Box>
        </Box>

        <ModalUpdateProfile />
        <ModalUpdateProfile isChangePassword />
      </Box>
    </Flex>
  );
};
