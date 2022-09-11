/* eslint-disable react/jsx-no-comment-textnodes */
import { Box, Flex, Spinner, Grid, GridItem, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Card } from '~/components/Card';
import 'src/styles/pagination.css';
import { useUsersQuery } from '~/generated/graphql';

export const Home = () => {
  const { data, loading } = useUsersQuery({ fetchPolicy: 'cache-and-network' });
  const [pageNumber, setPageNumber] = useState(0);
  const moviesPerPage = 3;
  const pagesVisited = pageNumber * moviesPerPage;
  const displayMovies = data?.users
    .slice(pagesVisited, pagesVisited + moviesPerPage)
    .map((user) => (
      <GridItem w='100%' key={user.id}>
        <Card email={user?.email} name={user?.name} img={user?.photoUrl} />
      </GridItem>
    ));
  const pageCount = Math.floor(data?.users.length / moviesPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };
  return (
    <Flex
      w='full'
      bg='gray.400'
      _dark={{
        bgGradient: 'linear(to-b, #fc45a9, #c64089, #6945fc)',
      }}
      py={8}
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      <Heading
        _dark={{
          color: 'white',
        }}
        mb={4}
      >
        Users Registerd
      </Heading>

      <Box>
        {loading ? (
          <Flex align='center' justify='center'>
            <Spinner />
          </Flex>
        ) : (
          <Grid templateColumns={['repeat(1fr)', 'repeat(3, 1fr)']} gap={6}>
            {displayMovies}
          </Grid>
        )}
      </Box>

      <Flex flexDirection='row' justifyContent='center'>
        <Box>
          <ReactPaginate
            previousLabel={'🡰'}
            nextLabel={'🡲'}
            pageCount={Number(pageCount)}
            onPageChange={changePage}
            containerClassName={'paginationBttns'}
            previousLinkClassName={'previousBttn'}
            nextLinkClassName={'nextBttn'}
            disabledClassName={'paginationDisabled'}
            activeClassName={'paginationActive'}
          />
        </Box>
      </Flex>
    </Flex>
  );
};
