import { Box, Heading, HStack, Spinner, VStack } from '@chakra-ui/react';
import { useUsersQuery } from './generated/graphql';

function App() {
  const { data, loading, error } = useUsersQuery();
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <p>Error</p>;
  }
  return (
    <Box display='flex' justifyContent='center' alignItems='center' mt={36}>
      <VStack>
        {data?.users.map((user) => (
          <>
            <Heading key={user.id}>{user.name}</Heading>
            <Heading>{user.email}</Heading>
          </>
        ))}
      </VStack>
    </Box>
  );
}

export default App;
