import { Box, Heading } from '@chakra-ui/react';

export const About = () => {
  return (
    <Box
      bg='#edf3f8'
      _dark={{ bg: 'gray.800' }}
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Heading>About</Heading>
    </Box>
  );
};
