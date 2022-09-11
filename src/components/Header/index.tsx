/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  useColorMode,
  Image,
  Avatar,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaMoon, FaSignOutAlt, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LogoImg from '../../assets/logo.svg';

import { cookies } from '~/utils/cookies';
import { useUsersQuery } from '~/generated/graphql';
export function Header() {
  const bg = useColorModeValue('gray.100', 'gray.800');
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const { toggleColorMode: toggleMode } = useColorMode();
  const mobileNav = useDisclosure();
  const isLogged = !!cookies.get('auth.token');
  const photoUrl = window.localStorage.getItem('photoUrl');
  const name = window.localStorage.getItem('name');
  const idUser = window.localStorage.getItem('id');
  const { data } = useUsersQuery({ fetchPolicy: 'cache-and-network' });
  let photoUrlResponse: string;
  data.users.map((item) => {
    if (item.id === idUser) {
      photoUrlResponse = item.photoUrl;
    }
  });
  function removeCookie() {
    window.localStorage.clear();
    window.localStorage.setItem('chakra-ui-color-mode', 'dark');
    cookies.remove('auth.token');
    window.location.href = '/sign-in';
  }
  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w='full'
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
        shadow='md'
      >
        <Flex alignItems='center' justifyContent='space-between' mx='auto'>
          <Flex>
            <Link to='/'>
              <Box maxH={18} maxWidth={48} display='flex'>
                <chakra.button title='Choc Home Page' display='flex' alignItems='center'>
                  <Image src={LogoImg} w='36' h='28' objectFit='cover' />
                </chakra.button>
              </Box>
            </Link>
          </Flex>
          <HStack display='flex' alignItems='center'>
            <HStack
              spacing={2}
              mr={1}
              color='brand.500'
              display={{
                base: 'none',
                md: 'inline-flex',
              }}
            >
              <IconButton
                size='md'
                fontSize='lg'
                aria-label={`Switch to ${text} mode`}
                variant='ghost'
                color='current'
                ml={{
                  base: '0',
                  md: '3',
                }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
              />

              {isLogged ? (
                <Button variant='ghost' onClick={removeCookie}>
                  <FaSignOutAlt />
                </Button>
              ) : (
                ''
              )}
              <Link to='/'>
                <Button variant='ghost'>Home</Button>
              </Link>

              <Link to='/about'>
                <Button variant='ghost'>About</Button>
              </Link>

              <Link to='/pricing'>
                <Button variant='ghost'>Pricing</Button>
              </Link>

              {isLogged ? (
                ''
              ) : (
                <Link to='/sign-up'>
                  <Button variant='ghost'>Sign up</Button>
                </Link>
              )}

              {isLogged ? (
                ''
              ) : (
                <Link to='/sign-in'>
                  <Button variant='ghost'>Sign in</Button>
                </Link>
              )}

              {isLogged && (
                <Link to='/profile'>
                  <Avatar src={photoUrlResponse || photoUrl} name={name} />
                </Link>
              )}
            </HStack>

            <Box
              display={{
                base: 'inline-flex',
                md: 'none',
              }}
            >
              <IconButton
                display={{
                  base: 'flex',
                  md: 'none',
                }}
                aria-label='Open menu'
                fontSize='20px'
                color='gray.800'
                _dark={{
                  color: 'inherit',
                }}
                variant='ghost'
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos='absolute'
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? 'flex' : 'none'}
                flexDirection='column'
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded='sm'
                shadow='sm'
              >
                <CloseButton aria-label='Close menu' onClick={mobileNav.onClose} />

                <Button w='full' variant='ghost'>
                  About
                </Button>
                <Button w='full' variant='ghost'>
                  Pricing
                </Button>
                <Button w='full' variant='ghost'>
                  Blog
                </Button>
                <Button w='full' variant='ghost'>
                  Company
                </Button>
                <Button w='full' variant='ghost'>
                  Sign in
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
