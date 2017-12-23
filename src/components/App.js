// external dependencies
import React from 'react';
import styled from 'styled-components';

// components
import Header from 'components/Header';
import RepositoryList from 'components/RepositoryList';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100vh;
  width: 100%;
`;

export const StyledHeader = styled(Header)`
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  z-index: 1;
`;

export const StyledList = styled(RepositoryList)`
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  min-height: 1px;
  z-index: 0;
`;

const App = () => {
  return (
    <Container>
      <StyledHeader />

      <StyledList />
    </Container>
  );
};

App.displayName = 'App';

export default App;
