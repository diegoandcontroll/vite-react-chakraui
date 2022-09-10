import { Box, Flex, Spinner, Grid, GridItem, Heading } from '@chakra-ui/react';
import { Card } from '~/components/Card';

import { useUsersQuery } from '~/generated/graphql';

export const Home = () => {
  const { data, loading } = useUsersQuery({ fetchPolicy: 'network-only' });

  return (
    <Flex
      w='full'
      bg='gray.400'
      _dark={{
        bg: 'gray.700',
      }}
      p={50}
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      <Heading
        _dark={{
          color: 'white',
        }}
        py='4'
      >
        Users Registerd
      </Heading>

      <Box>
        {loading ? (
          <Flex align='center' justify='center'>
            <Spinner />
          </Flex>
        ) : (
          <Grid templateColumns='repeat(3, 1fr)' gap={6}>
            {data.users.map((user) => (
              <>
                <GridItem w='100%' key={user.id}>
                  <Card email={user.email} name={user.name} img={user.photoUrl} />
                </GridItem>
              </>
            ))}
          </Grid>
        )}
      </Box>
    </Flex>
  );
};
