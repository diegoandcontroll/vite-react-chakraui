import {
  chakra,
  Box,
  GridItem,
  Button,
  Center,
  Flex,
  SimpleGrid,
  VisuallyHidden,
  Input,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useCreateUserMutation } from '~/generated/graphql';
import { RouteComponentProps } from 'react-router-dom';

export const SignUp = ({ history }: RouteComponentProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [createUser] = useCreateUserMutation();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await createUser({
        variables: {
          data: {
            email,
            password,
            photoUrl,
            name,
          },
        },
      });

      if (response.data?.createUser) {
        setLoading(false);
        toast({
          title: 'Account created.',
          description: 'Check to email to confirmation login',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        history.push('/');
      } else {
        toast({
          title: 'Error to create account',
          description: 'Try again later',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        console.log(response.errors?.map((err) => err.message));
      }
    } catch (e) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
    setName('');
    setEmail('');
    setPassword('');
    setPhotoUrl('');
  };
  return (
    <Box px={8} py={24} mx='auto' _dark={{ bg: 'gray.700' }} bg='gray.400'>
      <SimpleGrid
        alignItems='center'
        w={{
          base: 'full',
          xl: 11 / 12,
        }}
        columns={{
          base: 1,
          lg: 11,
        }}
        gap={{
          base: 0,
          lg: 24,
        }}
        mx='auto'
      >
        <GridItem
          colSpan={{
            base: 'auto',
            lg: 7,
          }}
          textAlign={{
            base: 'center',
            lg: 'left',
          }}
        >
          <chakra.h1
            mb={4}
            fontSize={{
              base: '3xl',
              md: '4xl',
            }}
            fontWeight='bold'
            lineHeight={{
              base: 'shorter',
              md: 'none',
            }}
            color='black'
            _dark={{
              color: 'gray.200',
            }}
            letterSpacing={{
              base: 'normal',
              md: 'tight',
            }}
          >
            Ready to start your journey?
          </chakra.h1>
          <chakra.p
            mb={{
              base: 10,
              md: 4,
            }}
            fontSize={{
              base: 'lg',
              md: 'xl',
            }}
            fontWeight='thin'
            _dark={{ color: 'white' }}
            color='black'
            letterSpacing='wider'
          >
            Low-latency voice and video feels like you’re in the same room. Wave hello over video,
            watch friends stream their games, or gather up and have a drawing session with screen
            share.
          </chakra.p>
        </GridItem>
        <GridItem
          colSpan={{
            base: 'auto',
            md: 4,
          }}
        >
          <Box
            as='form'
            onSubmit={(e: any) => handleSubmit(e)}
            mb={6}
            rounded='lg'
            shadow='xl'
            _dark={{ bg: 'gray.600' }}
            py={6}
            bg='gray.200'
          >
            <Center
              pb={0}
              color='gray.700'
              _dark={{
                color: 'gray.600',
              }}
            >
              <chakra.p
                pt={2}
                color='black'
                fontWeight='bold'
                lineHeight='8'
                _dark={{
                  color: 'white',
                }}
              >
                Start sign up now
              </chakra.p>
            </Center>
            <SimpleGrid
              columns={1}
              px={6}
              py={4}
              spacing={4}
              borderBottom='solid 1px'
              color='gray.200'
              _dark={{
                color: 'gray.700',
              }}
            >
              <Flex>
                <VisuallyHidden>First Name</VisuallyHidden>
                <Input
                  mt={0}
                  type='text'
                  placeholder='First Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  border='1px solid'
                  borderColor='gray.400'
                  color='black'
                  _dark={{
                    color: 'white',
                  }}
                />
              </Flex>
              <Flex>
                <VisuallyHidden>Email Address</VisuallyHidden>
                <Input
                  mt={0}
                  type='email'
                  placeholder='Email Address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  border='1px solid'
                  borderColor='gray.400'
                  color='black'
                  _dark={{
                    color: 'white',
                  }}
                />
              </Flex>
              <Flex>
                <VisuallyHidden>Confirm Email Address</VisuallyHidden>
                <Input
                  mt={0}
                  type='text'
                  placeholder='Photo Url Link'
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  border='1px solid'
                  borderColor='gray.400'
                  color='black'
                  _dark={{
                    color: 'white',
                  }}
                />
              </Flex>
              <Flex>
                <VisuallyHidden>Password</VisuallyHidden>
                <Input
                  mt={0}
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  color='black'
                  _dark={{
                    color: 'white',
                  }}
                  border='1px solid'
                  borderColor='gray.400'
                />
              </Flex>
              {loading ? (
                <Box display='flex' justifyContent='center' alignItems='center'>
                  <Spinner />
                </Box>
              ) : (
                <Button
                  colorScheme='brand'
                  bg='gray.400'
                  w='full'
                  py={2}
                  type='submit'
                  color='black'
                  _dark={{
                    bg: 'gray.300',
                  }}
                  _hover={{
                    bg: 'gray.600',
                    _dark: { bg: 'gray.500' },
                  }}
                >
                  Sign up
                </Button>
              )}
            </SimpleGrid>
          </Box>
          <chakra.p fontSize='xs' textAlign='center' color='white'>
            By signing up you agree to our <chakra.a color='brand.500'>Terms of Service</chakra.a>
          </chakra.p>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};
