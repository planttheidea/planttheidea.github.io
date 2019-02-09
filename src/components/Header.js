// external dependencies
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import GithubCorner from 'react-github-corner';
import {connect} from 'react-redux';
import styled from 'styled-components';

// actions
import * as userProfileActions from 'actions/userProfileActions';

export const Container = styled.header`
  align-items: center;
  background-color: #fff;
  border-bottom: 5px solid #de6e4b;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  padding: 5px 15px 0;
  width: 100%;
`;

export const IMAGE_SIZE = '75px';

export const ImageContainer = styled.div`
  flex-basis: ${IMAGE_SIZE};
  flex-grow: 0;
  flex-shrink: 0;
  height: ${IMAGE_SIZE};
  margin-left: auto;
  width: ${IMAGE_SIZE};GithubLink
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
  margin-right: auto;
`;

export const UserName = styled.div`
  font-family: Aleo, serif;
  font-size: 18px;

  @media screen and (min-width: 600px) {
    font-size: 24px;
  }

  @media screen and (min-width: 1000px) {
    font-size: 30px;
  }
`;

export const HumanName = styled.div`
  font-family: Aleo, serif;
  font-size: 11px;
  font-weight: 300;
  margin-left: 13px;

  @media screen and (min-width: 600px) {
    font-size: 14px;
    margin-left: 23px;
  }

  @media screen and (min-width: 1000px) {
    font-size: 16px;
    margin-left: 36px;
  }
`;

export const StyledGithubCorner = styled(GithubCorner)`
  position: absolute;
  right: 0;
  top: 0;
`;

export const createComponentDidMount = (instance) => 
  /**
   * @function componentDidMount
   *
   * @description
   * on mount, get the user profile
   */
  () => {
    const {getUserProfile} = instance.props;

    getUserProfile();
  }
;

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

  const {avatar_url: avatarUrl, html_url: githubUrl, login, name} = userProfile;

  return {
    avatarUrl,
    githubUrl,
    isLoadingUserProfile,
    login,
    name,
    userProfileError,
  };
};

const mapDispatchToProps = {
  ...userProfileActions,
};

class Header extends PureComponent {
  static displayName = 'Header';

  static propTypes = {
    avatarUrl: PropTypes.string,
    className: PropTypes.string,
    githubUrl: PropTypes.string,
    isLoadingUserProfile: PropTypes.bool.isRequired,
    login: PropTypes.string,
    name: PropTypes.string,
    userProfileError: PropTypes.object,
  };

  // lifecycle methods
  componentDidMount = createComponentDidMount(this);

  render() {
    const {avatarUrl, className, githubUrl, login, name, userProfileError} = this.props;

    if (userProfileError) {
      return (
        <Container className={className}>
          <Text>
            <UserName>repositories</UserName>
          </Text>
        </Container>
      );
    }

    return (
      <Container className={className}>
        <ImageContainer>
          <Image
            alt="planttheidea avatar"
            src={avatarUrl}
          />
        </ImageContainer>

        <Text hasImage={!!avatarUrl}>
          <UserName>{login} repositories</UserName>

          <HumanName>({name})</HumanName>
        </Text>

        <StyledGithubCorner
          ariaLabel="Open plantheidea's github"
          bannerColor="#5d5d5d"
          href={githubUrl}
          target="_blank"
          title="Open plantheidea's github"
        />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
