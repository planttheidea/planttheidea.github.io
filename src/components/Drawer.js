// external dependencies
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {createPortal} from 'react-dom';
import {MdClose as Close} from 'react-icons/md';
import styled from 'styled-components';

// components
import Loading from 'components/Loading';

export const ESCAPE_KEY = 27;

/**
 * @function getTransform
 *
 * @description
 * get the transform value based on whether the drawer is active
 *
 * @param {boolean} isActive is the drawer open
 * @returns {string} the transform CSS value
 */
export const getTransform = ({isActive}) => (isActive ? 'none' : 'translateX(100%)');

export const Container = styled.aside`
  background-color: #fff;
  bottom: 0;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: fixed;
  right: 0;
  top: 0;
  transform: ${getTransform};
  transition: transform 150ms ease-in-out;
  width: 95%;
  z-index: 1000;

  & > .loader {
    height: 100%;
  }

  & > .loadedContent {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100%;
  }

  @media screen and (min-width: 1000px) {
    width: 75%;
  }

  @media screen and (min-width: 1600px) {
    width: 60%;
  }
`;

export const Header = styled.header`
  align-items: center;
  background-color: #f0f0f0;
  display: flex;
  flex-basis: auto;
  flex-direction: row;
  flex-grow: 0;
  flex-shrink: 0;
  flex-wrap: nowrap;
  padding: 15px;
`;

export const CloseButton = styled(Close)`
  cursor: pointer;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 16px;
  margin-left: auto;
`;

export const HeaderText = styled.span`
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  font-size: 24px;
  min-width: 1px;
`;

export const Contents = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  min-height: 1px;
  overflow: auto;
  padding: 15px;

  & pre {
    background-color: #5d5d5d;
    border-radius: 5px;
    color: #f0f0f0;
    overflow: auto;
    padding: 5px;
    width: 100%;
  }
`;

let drawerContainer;

export const createComponentWillMount = () =>
  /**
   * @function componentWillMount
   *
   * @description
   * prior to mount, set the drawer container if it does not already exist
   */
  () => {
    if (!drawerContainer) {
      drawerContainer = document.querySelector('#drawer');
    }
  };

export const createComponentDidUpdate = (instance) =>
  /**
   * @function componentDidUpdate
   *
   * @description
   * on update, if the active status has changed then add or remove the event listener as appropriate
   *
   * @param {boolean} wasActive was the drawer previously active
   */
  ({isActive: wasActive}) => {
    const {isActive} = instance.props;

    if (isActive && !wasActive) {
      window.addEventListener('keyup', instance.closeOnEscapeKey);
    } else if (!isActive && wasActive) {
      window.removeEventListener('keyup', instance.closeOnEscapeKey);
    }
  };

export const createCloseOnEscapeKey = (instance) =>
  /**
   * @function closeOnEscapeKey
   *
   * @description
   * if the key pressed is the ESC key, close the drawer
   *
   * @param {Event} event the keyup event
   */
  (event) => {
    const {onClose} = instance.props;

    if (event.keyCode === ESCAPE_KEY) {
      onClose(event);
    }
  };

class Drawer extends PureComponent {
  static displayName = 'Drawer';

  static propTypes = {
    children: PropTypes.node,
    header: PropTypes.string,
    isActive: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
  };

  // lifecycle methods
  UNSAFE_componentWillMount = createComponentWillMount(this);
  componentDidUpdate = createComponentDidUpdate(this);

  // instance methods
  closeOnEscapeKey = createCloseOnEscapeKey(this);

  render() {
    const {children, header, onClose, isActive, isLoading} = this.props;

    return createPortal(
      <Container isActive={isActive}>
        <Loading
          isLoading={isLoading}
          top="50%"
        >
          <Header>
            <HeaderText>{header}</HeaderText>

            <CloseButton
              onClick={onClose}
              role="button"
            />
          </Header>

          <Contents>{children}</Contents>
        </Loading>
      </Container>,
      drawerContainer
    );
  }
}

export default Drawer;
