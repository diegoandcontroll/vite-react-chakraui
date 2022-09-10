import { Box, Flex, Icon, Image, chakra } from '@chakra-ui/react';

import { MdEmail, MdHeadset, MdLocationOn } from 'react-icons/md';
import { BsFillBriefcaseFill } from 'react-icons/bs';
type CardProps = {
  img?: string;
  name?: string;
  email?: string;
};
export const Card = ({ email, name, img }: CardProps) => {
  return (
    <Box
      w='sm'
      mx='auto'
      bg='white'
      _dark={{ bg: 'gray.800' }}
      shadow='lg'
      rounded='lg'
      overflow='hidden'
    >
      <Image
        w='full'
        h={56}
        fit='cover'
        objectPosition='center'
        src={
          img
            ? img
            : 'https://img.freepik.com/premium-vector/qr-code-scanning-concept-with-characters_23-2148625453.jpg?w=2000'
        }
        alt='avatar'
      />

      <Flex alignItems='center' px={6} py={3} bg='gray.900'>
        <Icon as={MdHeadset} h={6} w={6} color='white' />

        <chakra.h1 mx={3} color='white' fontWeight='bold' fontSize='lg'>
          Focusing
        </chakra.h1>
      </Flex>

      <Box py={4} px={6} minH={86}>
        <chakra.h1 fontSize='xl' fontWeight='bold' color='gray.800' _dark={{ color: 'white' }}>
          {name ? name : 'Jhon Doe'}
        </chakra.h1>

        <chakra.p py={2} color='gray.700' _dark={{ color: 'gray.400' }}>
          Full Stack maker & UI / UX Designer , love hip hop music Author of Building UI.
        </chakra.p>

        <Flex alignItems='center' mt={4} color='gray.700' _dark={{ color: 'gray.200' }}>
          <Icon as={BsFillBriefcaseFill} h={6} w={6} mr={2} />

          <chakra.h1 px={2} fontSize='sm'>
            Choc UI
          </chakra.h1>
        </Flex>

        <Flex alignItems='center' mt={4} color='gray.700' _dark={{ color: 'gray.200' }}>
          <Icon as={MdLocationOn} h={6} w={6} mr={2} />

          <chakra.h1 px={2} fontSize='sm'>
            California
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
  );
};
