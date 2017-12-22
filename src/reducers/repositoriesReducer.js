// external dependencies
import {handleActions} from 'redux-actions';

// actions
import {ACTION_TYPES} from 'actions/repositoriesActions';

export const INITIAL_STATE = {
  isLoadingRepositories: false,
  repositories: [],
  repositoriesError: null
};

const getRepositoriesFail = (state, {payload: repositoriesError}) => {
  return {
    ...state,
    isLoadingRepositories: false,
    repositoriesError
  };
};

const getRepositoriesPending = (state) => {
  return {
    ...state,
    isLoadingRepositories: true
  };
};

const getRepositoriesSuccess = (state, {payload: repositories}) => {
  return {
    ...state,
    isLoadingRepositories: false,
    repositories,
    repositoriesError: null
  };
};

export default handleActions(
  {
    [ACTION_TYPES.GET_REPOSITORIES_FAIL]: getRepositoriesFail,
    [ACTION_TYPES.GET_REPOSITORIES_PENDING]: getRepositoriesPending,
    [ACTION_TYPES.GET_REPOSITORIES_SUCCESS]: getRepositoriesSuccess
  },
  INITIAL_STATE
);
