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
import { useUsersQuery } from '~/generated/graphql';
import { useAuth } from '~/hooks/authContext';
import { token } from '~/utils/cookies';

export const Home = () => {
  const { user } = useAuth();
  const { data, loading } = useUsersQuery({ fetchPolicy: 'network-only' });
  console.log(token);
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
            <VStack spacing={8}>
              {loading && (
                <Box display='flex' justifyContent='center' alignItems='center'>
                  <Spinner />
                </Box>
              )}
              {data &&
                data.users.map((user) => (
                  <Wrap key={user.id} minW='448'>
                    <Box display='flex' gap='5' justifyContent='center' alignItems='center'>
                      <HStack>
                        <WrapItem display='flex' justifyContent='center' alignItems='center' pr='5'>
                          <Avatar name={user.name} src={user?.photoUrl} />
                        </WrapItem>
                        <VStack>
                          <chakra.h3
                            fontWeight='bold'
                            color='gray.600'
                            _dark={{
                              color: 'white',
                            }}
                            style={{}}
                          >
                            Email:{' '}
                            <chakra.span
                              fontWeight='400'
                              _dark={{
                                color: 'gray.300',
                              }}
                            >
                              {user.email}
                            </chakra.span>
                          </chakra.h3>

                          <chakra.h3
                            fontWeight='bold'
                            color='gray.600'
                            style={{ marginRight: '7rem' }}
                            _dark={{
                              color: 'white',
                            }}
                          >
                            Name:{' '}
                            <chakra.span
                              fontWeight='400'
                              _dark={{
                                color: 'gray.300',
                              }}
                            >
                              {user.name}
                            </chakra.span>
                          </chakra.h3>
                        </VStack>
                      </HStack>
                    </Box>
                  </Wrap>
                ))}
            </VStack>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};
