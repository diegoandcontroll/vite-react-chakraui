import { Grid, GridItem } from '@chakra-ui/react';
function App() {
  return (
    <Grid templateColumns='repeat(5, 1fr)' gap={6} mt={6}>
      <GridItem w='100%' h='10' bg='purple.900' />
      <GridItem w='100%' h='10' bg='purple.700' />
      <GridItem w='100%' h='10' bg='purple.500' />
    </Grid>
  );
}

export default App;
