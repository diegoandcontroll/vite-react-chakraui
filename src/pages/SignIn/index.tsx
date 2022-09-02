import { chakra, Flex, SimpleGrid, Image, Button, Input, FormLabel } from '@chakra-ui/react';

export const SignIn = () => {
  return (
    <SimpleGrid
      columns={{
        base: 1,
        md: 2,
      }}
      gridTemplateColumns='38rem 2fr'
      spacing='0'
    >
      <Flex order='2'>
        <Image
          src='https://img.freepik.com/free-vector/programmer-work-with-working-day-symbols-flat-illustration_1284-60322.jpg?w=2000'
          alt='3 women looking at a laptop'
          _dark={{
            opacity: 0.7,
          }}
          w='full'
          objectPosition='center'
          loading='lazy'
          objectFit='cover'
          opacity='10'
          zIndex={-99999}
        />
      </Flex>
      <Flex
        as='form'
        direction='column'
        alignItems='center'
        justifyContent='center'
        w='full'
        zIndex={3}
        bg='gray.300'
        _dark={{ bg: 'gray.700' }}
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
            color: 'gray.300',
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
            type='text'
            placeholder='E-mail'
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
              bg: 'gray.300',
            }}
            border='1px solid'
            borderColor='gray.700'
            _hover={{
              bg: 'gray.500',
              _dark: { bg: 'gray.500' },
            }}
          >
            Login now
          </Button>
        </SimpleGrid>
      </Flex>
    </SimpleGrid>
  );
};
