import { Box, Heading, useColorModeValue } from '@chakra-ui/react';

function App() {
  const bg = useColorModeValue('white', 'pink.500');
  const bgVariant = useColorModeValue('white', 'green.200');
  return (
    <Box w='100%' h={96} bgGradient={`linear(to-r, ${bgVariant}, ${bg})`} pl={12} pr={12}>
      <Heading>Hellow World</Heading>
    </Box>
  );
}

export default App;
