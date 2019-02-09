// external dependencies
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import Repo from 'react-icons/lib/go/repo';
import Fork from 'react-icons/lib/go/repo-forked';
import Readme from 'react-icons/lib/ti/document-text';
import {connect} from 'react-redux';
import Star from 'react-icons/lib/go/star';
import styled from 'styled-components';

// actions
import * as repositoryActions from 'actions/repositoryActions';

// components
import Button from 'components/Button';

// constants
import {MONTH_DAY_YEAR_HOUR_MINUTE_SECOND_FORMAT} from 'constants/date';

// utils
import {getDate} from 'utils/date';

/**
 * @function getBorderLeftColor
 *
 * @description
 * get the border color for the card based
 *
 * @param {boolean} isActive is the card active
 * @returns {string} the CSS border-left-color vaue
 */
export const getBorderLeftColor = ({isActive}) => isActive ? '#de6e4b' : '#7fd1b9';

export const Container = styled.div`
  background-color: #fff;
  border-left: 5px solid ${getBorderLeftColor};
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(122, 101, 99, 0.12), 0 1px 2px rgba(122, 101, 99, 0.24);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 100%;
  padding: 15px;
  transition: border-color 150ms ease-in-out;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-basis: 0;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  flex-wrap: nowrap;
  font-size: 24px;
  height: 100%;
  justify-content: space-between;
  min-width: 1px;
`;

export const NameContainer = styled.div`
  align-items: center;
  lign-self: flex-end;
  display: flex;
  flex-direction: row;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  flex-wrap: nowrap;
`;

export const RepoType = styled.div`
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
`;

export const Name = styled.div`
  display: inline-block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  margin-left: 5px;
  min-width: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  white-space: nowrap;
`;

export const Description = styled.div`
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 14px;
  margin-top: 5px;
  padding-right: 5px;
`;

export const DetailsContainer = styled.div`
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  margin-top: auto;
`;

export const Detail = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 12px;
  margin-top: 5px;
`;

export const Counts = Detail.extend`
  font-size: 16px;
  margin-top: 15px;
`;

export const Count = styled.span`
  display: inline-block;
  margin: 0 15px 0 5px;
  vertical-align: middle;
`;

export const ButtonContainer = styled.div`
  flex-basis: auto;
  flex-grow: 0;
  flex-shrik: 0;
`;

export const ReadmeIcon = styled(Readme)`
  font-size: 14px;

  @media screen and (min-width: 600px) {
    font-size: 17px;
  }

  @media screen and (min-width: 1000px) {
    font-size: 22px;
  }
`;

export const createOnClickViewReadme = (instance) => 
  /**
   * @function onClickViewReadme
   *
   * @description
   * when the readme view is requested, call it with the project name
   */
  () => {
    const {getReadme, name} = instance.props;

    getReadme(name);
  }
;

const mapDispatchToProps = {
  ...repositoryActions,
};

class RepositoryCard extends PureComponent {
  static displayName = 'RepositoryCard';

  static propTypes = {
    className: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    description: PropTypes.string,
    fork: PropTypes.bool,
    forks_count: PropTypes.number.isRequired,
    getReadme: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    isButtonDisabled: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    stargazers_count: PropTypes.number.isRequired,
    tabIndex: PropTypes.number.isRequired,
    updated_at: PropTypes.string.isRequired,
  };

  // instance methods
  onClickViewReadme = createOnClickViewReadme(this);

  render() {
    const {
      className,
      created_at,
      description,
      fork,
      forks_count,
      isActive,
      isButtonDisabled,
      name,
      stargazers_count,
      tabIndex,
      updated_at,
    } = this.props;

    return (
      <Container
        className={className}
        isActive={isActive}
      >
        <InfoContainer>
          <NameContainer>
            <RepoType>
              {!fork && <Repo />}

              {fork && <Fork />}
            </RepoType>

            <Name title={name}>{name}</Name>
          </NameContainer>

          <Description>{description}</Description>

          <DetailsContainer>
            <Counts>
              <Star /> <Count>{stargazers_count}</Count>
              <Fork /> <Count>{forks_count}</Count>
            </Counts>

            <Detail>Created: {format(getDate(created_at), MONTH_DAY_YEAR_HOUR_MINUTE_SECOND_FORMAT)}</Detail>

            <Detail>Last updated: {format(getDate(updated_at), MONTH_DAY_YEAR_HOUR_MINUTE_SECOND_FORMAT)}</Detail>
          </DetailsContainer>
        </InfoContainer>

        <ButtonContainer>
          <Button
            disabled={isButtonDisabled}
            onClick={this.onClickViewReadme}
            tabIndex={tabIndex}
            title="View README file"
          >
            <ReadmeIcon />
          </Button>
        </ButtonContainer>
      </Container>
    );
  }
}

export default connect(null, mapDispatchToProps)(RepositoryCard);
