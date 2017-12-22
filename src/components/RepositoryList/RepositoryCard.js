// external dependencies
import PropTypes from 'prop-types';
import React from 'react';
import Repo from 'react-icons/lib/go/repo';
import RepoForked from 'react-icons/lib/go/repo-forked';
import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  border-left: 5px solid #7fb1d9;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(122, 101, 99, 0.12), 0 1px 2px rgba(122, 101, 99, 0.24);
  padding: 15px;
`;

export const NameContainer = styled.div`
  font-size: 24px;
`;

export const Name = styled.div`
  display: inline-block;
  margin-left: 5px;
  vertical-align: middle;
`;

const RepositoryCard = ({className, forked, name, ...props}) => {
  console.log(props);

  return (
    <Container className={className}>
      <NameContainer>
        {!forked && <Repo />}

        {forked && <RepoForked />}

        <Name>{name}</Name>
      </NameContainer>
    </Container>
  );
};

RepositoryCard.displayName = 'RepositoryCard';

RepositoryCard.propTypes = {
  className: PropTypes.string,
  forked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
};

export default RepositoryCard;
