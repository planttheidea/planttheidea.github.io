// external dependencies
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  appearance: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  color: inherit;
  cursor: pointer;
  font-size: 14px;
  outline: 0;
  padding: 5px 8px;

  @media screen and (min-width: 600px) {
    padding: 8px 12px;
  }

  @media screen and (min-width: 1000px) {
    padding: 10px 15px;
  }

  &:active,
  &:focus,
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
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
