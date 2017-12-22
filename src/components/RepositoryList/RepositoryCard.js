// external dependencies
import {format} from 'date-fns';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import Repo from 'react-icons/lib/go/repo';
import RepoForked from 'react-icons/lib/go/repo-forked';
import Readme from 'react-icons/lib/go/file-text';
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

export const getBorderLeftColor = ({isActive}) => {
  return isActive ? '#de6e4b' : '#7fd1b9';
};

export const Container = styled.div`
  align-items: center;
  background-color: #fff;
  border-left: 5px solid ${getBorderLeftColor};
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(122, 101, 99, 0.12), 0 1px 2px rgba(122, 101, 99, 0.24);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 15px;
  transition: border-color 150ms ease-in-out;
`;

export const InfoContainer = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  font-size: 24px;
  min-width: 1px;
`;

export const Name = styled.div`
  display: inline-block;
  margin-left: 5px;
  vertical-align: middle;
`;

export const Detail = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 12px;
  margin-top: 5px;
`;

export const Stars = Detail.extend`
  font-size: 16px;
`;

export const StarsCount = styled.span`
  display: inline-block;
  margin-left: 5px;
  vertical-align: middle;
`;

export const ButtonContainer = styled.div`
  flex-basis: auto;
  flex-grow: 0;
  flex-shrik: 0;
`;

export const createOnClickViewReadme = (instance) => {
  /**
   * @function onClickViewReadme
   *
   * @description
   * when the readme view is requested, call it with the project name
   */
  return () => {
    const {getReadme, name} = instance.props;

    getReadme(name);
  };
};

const mapDispatchToProps = {
  ...repositoryActions
};

class RepositoryCard extends PureComponent {
  static displayName = 'RepositoryCard';

  static propTypes = {
    className: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    fork: PropTypes.bool,
    getReadme: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    isButtonDisabled: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    stargazers_count: PropTypes.number.isRequired,
    updated_at: PropTypes.string.isRequired
  };

  // instance methods
  onClickViewReadme = createOnClickViewReadme(this);

  render() {
    const {className, created_at, fork, isActive, isButtonDisabled, name, stargazers_count, updated_at} = this.props;

    return (
      <Container
        className={className}
        isActive={isActive}
      >
        <InfoContainer>
          {!fork && <Repo />}

          {fork && <RepoForked />}

          <Name>{name}</Name>

          <Stars>
            <Star /> <StarsCount>{stargazers_count}</StarsCount>
          </Stars>

          <Detail>Created: {format(getDate(created_at), MONTH_DAY_YEAR_HOUR_MINUTE_SECOND_FORMAT)}</Detail>

          <Detail>Last updated: {format(getDate(updated_at), MONTH_DAY_YEAR_HOUR_MINUTE_SECOND_FORMAT)}</Detail>
        </InfoContainer>

        <ButtonContainer>
          <Button
            disabled={isButtonDisabled}
            onClick={this.onClickViewReadme}
          >
            <Readme />

            <span>View README</span>
          </Button>
        </ButtonContainer>
      </Container>
    );
  }
}

export default connect(null, mapDispatchToProps)(RepositoryCard);
