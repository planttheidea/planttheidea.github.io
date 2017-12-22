// external dependencies
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  appearance: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  outline: 0;
  padding: 10px 15px;

  &:hover {
    background-color: #f0f0f0;
  }

  & > span {
    display: inline-block;
    font-size: 12px;
    margin-left: 5px;
    vertical-align: middle;
  }

  &[disabled] {
    pointer-events: none;
  }
`;

Button.displayName = 'Button';

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'reset', 'submit'])
};

Button.defaultProps = {
  type: 'button'
};

export default Button;
