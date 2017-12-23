// external dependencies
import PropTypes from 'prop-types';
import React from 'react';
import Error from 'react-icons/lib/md/error-outline';
import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  background-color: #de4b4b;
  color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 15px;
  padding: 15px;
`;

export const ErrorIcon = styled(Error)`
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 36px;
  margin-right: 5px;
`;

export const Message = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  font-size: 16px;
  min-width: 1px;
`;

const ErrorNotification = ({children}) => {
  return (
    <Container>
      <ErrorIcon /> <Message>{children}</Message>
    </Container>
  );
};

ErrorNotification.displayName = 'ErrorNotification';

ErrorNotification.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorNotification;
