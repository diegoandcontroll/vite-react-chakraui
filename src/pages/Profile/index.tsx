import {
  Box,
  Flex,
  chakra,
  Wrap,
  WrapItem,
  Avatar,
  VStack,
  Spinner,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { RouteComponentProps } from 'react-router-dom';
import { useUserQuery } from '~/generated/graphql';
import { useAuth } from '~/hooks/authContext';

export const Profile = ({ history }: RouteComponentProps) => {
  const { user } = useAuth();
  const { data, error, loading } = useUserQuery({
    variables: {
      id: user?.id,
    },
  });

  if (error) {
    console.log(error);
    // history.push('/');
    return <div>Error</div>;
  }
  if (loading) {
    return <Spinner />;
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
          <Box w={['full', '100%']} mx='auto'>
            {/* <VStack spacing={8}>
              {loading && (
                <Box display='flex' justifyContent='center' alignItems='center'>
                  <Spinner />
                </Box>
              )}
            </VStack> */}
            <Heading>Hellow {data.user?.name}</Heading>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};
