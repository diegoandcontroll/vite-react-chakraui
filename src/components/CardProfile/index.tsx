import { Box, Flex, Image, chakra, Icon } from '@chakra-ui/react';
import { MdEmail } from 'react-icons/md';
type CardProfileProps = {
  name: string;
  photoUrl: string;
  email: string;
};
export const CardProfile = ({ email, photoUrl, name }: CardProfileProps) => {
  return (
    <Flex w='full' alignItems='center' justifyContent='center'>
      <Box
        w={['38', 'xs']}
        bg='white'
        _dark={{ bg: 'gray.800' }}
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        mx='auto'
      >
        <Image
          w='full'
          h={56}
          fit='cover'
          src={
            photoUrl
              ? photoUrl
              : 'https://64.media.tumblr.com/682029d838e0871f68c0e60ccc4c3bc4/45f83e12205670d4-97/s400x600/07da00edb360d763f0d1219e45ba4fe94bdd261d.jpg'
          }
          alt='avatar'
        />

        <Box
          py={5}
          textAlign='center'
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
        >
          <Flex alignItems='center' mt={4} color='gray.700' _dark={{ color: 'gray.200' }}>
            <chakra.h1 px={2} fontSize='sm'>
              {name ? name : 'Jhon Doe'}
            </chakra.h1>
          </Flex>
          <Flex alignItems='center' mt={4} color='gray.700' _dark={{ color: 'gray.200' }}>
            <Icon as={MdEmail} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize='sm'>
              {email ? email : 'Jhondoe@email.com'}
            </chakra.h1>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};
