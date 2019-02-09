// external dependencies
import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import styledNormalize from 'styled-normalize';

// components
import Header from 'components/Header';
import RepositoryList from 'components/RepositoryList';

const GlobalStyle = createGlobalStyle`
  ${styledNormalize};

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
      border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgb(122, 101, 99);
  }

  * {
    box-sizing: border-box;
    font-family: inherit;
    position: relative;
  }

  body {
    background-color: #d8d3d2;
    color: #5d5d5d;
    font-family: 'Cooper Hewitt', sans-serif;
    font-size: 14px;
  }
`;

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

const App = () => (
  <Container>
    <GlobalStyle />

    <StyledHeader />

    <StyledList />
  </Container>
);

App.displayName = 'App';

export default App;
