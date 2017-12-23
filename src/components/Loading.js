// external dependencies
import PropTypes from 'prop-types';
import React from 'react';
import Loader from 'react-loader';

const Loading = ({children, isLoading, top}) => {
  return (
    <Loader
      color="#7a6563"
      loaded={!isLoading}
      radius={15}
      top={top}
      width={2}
    >
      {children}
    </Loader>
  );
};

Loading.displayName = 'Loading';

Loading.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  top: PropTypes.string.isRequired
};

Loading.defaultProps = {
  top: '50px'
};

export default Loading;
