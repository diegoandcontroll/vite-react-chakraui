import React from 'react';

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';

export function Header() {
  const bg = useColorModeValue('white', 'gray.800');
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const { toggleColorMode: toggleMode } = useColorMode();
  const mobileNav = useDisclosure();
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
            <chakra.a href='/' title='Choc Home Page' display='flex' alignItems='center'>
              <Text>Logo</Text>
              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontSize='xl' fontWeight='medium' ml='2'>
              Choc
            </chakra.h1>
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
              <Button variant='ghost'>Features</Button>
              <Button variant='ghost'>Pricing</Button>
              <Button variant='ghost'>Blog</Button>
              <Button variant='ghost'>Company</Button>
              <Button variant='ghost'>Sign in</Button>
            </HStack>
            <Button colorScheme='brand' size='sm'>
              Get Started
            </Button>
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
                  Features
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
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
