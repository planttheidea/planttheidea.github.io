// external dependencies
import debounce from 'lodash/debounce';
import moize from 'moize';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

// actions
import * as repositoriesActions from 'actions/repositoriesActions';

// components
import RepositoryCard from 'components/RepositoryList/RepositoryCard';

// utils
import {getFilteredRepositories} from 'utils/repositories';

export const DEBOUNCE_INPUT_TIMING = 100;

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;
`;

export const SearchContainer = styled.div`
  padding: 15px;
`;

export const Input = styled.input`
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  display: block;
  outline: 0;
  margin: 0;
  padding: 10px;
  width: 100%;

  &:focus {
    border: 1px solid #7fb1d9;
  }
`;

export const ListContainer = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  min-height: 1px;
  overflow: auto;
  width: 100%;
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding-left: 15px;
`;

export const CardContainer = styled.div`
  flex-basis: 100%;
  flex-grow: 0;
  flex-shrink: 0;
  height: auto;
  padding: 0 15px 15px 0;
  width: 100%;

  @media screen and (min-width: 1000px) {
    flex-basis: 50%;
    width: 50%;
  }

  @media screen and (min-width: 1600px) {
    flex-basis: 33.333333%;
    width: 33.333333%;
  }
`;

/**
 * @function getInitialState
 *
 * @description
 * get the initial state of the component
 *
 * @returns {Object} the initial state of the component
 */
export const getInitialState = () => {
  return {
    searchValue: ''
  };
};

export const createComponentDidMount = (instance) => {
  /**
   * @function componentDidMount
   *
   * @description
   * on mount, get the list of repositories
   */
  return () => {
    const {getRepositories} = instance.props;

    getRepositories();
  };
};

export const createDebounceOnChangeSearchValue = (instance) => {
  /**
   * @function debounceOnChangeSearchValue
   *
   * @description
   * debounce the update of the searchValue in state
   *
   * @param {string} searchValue the value to assign in state
   */
  return debounce((searchValue) => {
    instance.setState(() => {
      return {
        searchValue
      };
    });
  }, DEBOUNCE_INPUT_TIMING);
};

export const createOnChangeInput = (instance) => {
  /**
   * @function onChangeInput
   *
   * @description
   * when the input value changes, call the debounced method to update state
   *
   * @param {Event} event the change event
   */
  return (event) => {
    instance.debounceOnChangeSearchValue(event.currentTarget.value);
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
export const mapStateToProps = ({repositories: repos}) => {
  const {isLoadingRepositories, repositories, repositoriesError} = repos;

  return {
    isLoadingRepositories,
    repositories,
    repositoriesError
  };
};

const mapDispatchToProps = {
  ...repositoriesActions
};

export class RepositoryList extends PureComponent {
  static displayName = 'RepositoryList';

  static propTypes = {
    className: PropTypes.string,
    getRepositories: PropTypes.func.isRequired,
    isLoadingRepositories: PropTypes.bool.isRequired,
    repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
    repositoriesError: PropTypes.object
  };

  // state
  state = getInitialState();

  // lifecycle methods
  componentDidMount = createComponentDidMount(this);

  // instance methods
  debounceOnChangeSearchValue = createDebounceOnChangeSearchValue(this);
  getFilteredRepositories = moize.simple(getFilteredRepositories);
  onChangeInput = createOnChangeInput(this);

  render() {
    const {className, isLoadingRepositories, repositories, repositoriesError} = this.props;
    const {searchValue} = this.state;

    const filteredRepositories = this.getFilteredRepositories(repositories, searchValue);

    return (
      <Container className={className}>
        <SearchContainer>
          <Input
            onChange={this.onChangeInput}
            placeholder="Search for repositories"
            type="text"
          />
        </SearchContainer>

        <ListContainer>
          <List>
            {filteredRepositories.map((repository) => {
              return (
                <CardContainer key={repository.id}>
                  <RepositoryCard {...repository} />
                </CardContainer>
              );
            })}
          </List>
        </ListContainer>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryList);
