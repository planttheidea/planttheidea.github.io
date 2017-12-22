// external dependencies
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

// actions
import * as userProfileActions from 'actions/userProfileActions';

export const Container = styled.header`
  align-items: center;
  background-color: #fff;
  border-bottom: 15px solid #de6e4b;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  padding: 15px;
  width: 100%;
`;

export const IMAGE_SIZE = '75px';

export const ImageContainer = styled.div`
  flex-basis: ${IMAGE_SIZE};
  flex-grow: 0;
  flex-shrink: 0;
  height: ${IMAGE_SIZE};
  margin-left: auto;
  width: ${IMAGE_SIZE};
`;

export const Image = styled.img`
  display: block;
  max-height: auto;
  max-width: 100%;
`;

export const Text = styled.div`
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  margin: 0 auto 0 15px;
`;

export const UserName = styled.a`
  color: inherit;
  font-family: serif;
  font-size: 36px;
  text-decoration: none;
`;

export const createComponentDidMount = (instance) => {
  return () => {
    const {getUserProfile} = instance.props;

    getUserProfile();
  };
};

/**
 * @function mapStateToProps
 *
 * @description
 * map the selected values from state to props on the component
 *
 * @returns {Object} the state to map to props
 */
export const mapStateToProps = ({userProfile: user}) => {
  const {isLoadingUserProfile, userProfile, userProfileError} = user;

  const {avatar_url: avatarUrl, html_url: githubUrl, login} = userProfile;

  return {
    avatarUrl,
    githubUrl,
    isLoadingUserProfile,
    login,
    userProfileError
  };
};

const mapDispatchToProps = {
  ...userProfileActions
};

class Header extends PureComponent {
  static displayName = 'Header';

  static propTypes = {
    avatarUrl: PropTypes.string,
    className: PropTypes.string,
    githubUrl: PropTypes.string,
    isLoadingUserProfile: PropTypes.bool.isRequired,
    login: PropTypes.string,
    userProfileError: PropTypes.object
  };

  // lifecycle methods
  componentDidMount = createComponentDidMount(this);

  render() {
    const {avatarUrl, className, githubUrl, login} = this.props;

    return (
      <Container className={className}>
        <ImageContainer>
          <Image
            alt="planttheidea avatar"
            src={avatarUrl}
          />
        </ImageContainer>

        <Text>
          <UserName
            href={githubUrl}
            target="_blank"
          >
            {login}
          </UserName>
        </Text>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
