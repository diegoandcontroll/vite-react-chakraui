import { Box, Flex, Spinner, Heading } from '@chakra-ui/react';

import { RouteComponentProps } from 'react-router-dom';

import { ModalUpdateProfile } from '~/components/Modal';
import { useUserQuery } from '~/generated/graphql';
import { getItemLocalStorage } from '~/utils/localtorage';
import { CardProfile } from '~/components/CardProfile';
export const Profile = ({ history }: RouteComponentProps) => {
  const idUser = window.localStorage.getItem('id');
  const name = getItemLocalStorage('name');
  const email = getItemLocalStorage('email');
  const photoUrl = getItemLocalStorage('photoUrl');
  const { data, error, loading } = useUserQuery({
    variables: {
      id: idUser,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    console.log(error);
    history.push('/');

    return <div>Error</div>;
  }
  // if (!data) {
  //   return <div>No data</div>;
  // }
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
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      <Heading mt={2}>Profile Page</Heading>
      <Box
        minW={['', '1xl']}
        px={4}
        py={4}
        mx='auto'
        textAlign={{
          base: 'left',
          md: 'center',
        }}
        rounded='md'
      >
        <Box
          px={[0, 4]}
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
            py={8}
          >
            {/* {loading && (
              <Box display='flex' justifyContent='center' alignItems='center'>
                <Spinner />
              </Box>
            )} */}
            <CardProfile
              email={email ? email : data.user.email}
              name={name ? name : data.user.name}
              photoUrl={photoUrl ? photoUrl : data.user.photoUrl}
            />
            {/* <HStack>
              <WrapItem display='flex' justifyContent='center' alignItems='center' pr='5'>
                <Avatar name={data?.user.name || name} src={data?.user.photoUrl || photoUrl} />
              </WrapItem>
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
              >
                <chakra.h3 mr='28' ml='2'>
                  Name: <chakra.span>{data?.user.name || name}</chakra.span>
                </chakra.h3>
                <chakra.h3>
                  Email: <chakra.span>{data?.user.email || email}</chakra.span>
                </chakra.h3>
              </Box>
            </HStack> */}
          </Box>
        </Box>

        <ModalUpdateProfile />
        <ModalUpdateProfile isChangePassword />
      </Box>
    </Flex>
  );
};
