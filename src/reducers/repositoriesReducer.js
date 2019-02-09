// external dependencies
import {handleActions} from 'redux-actions';

// actions
import {ACTION_TYPES} from 'actions/repositoriesActions';

export const INITIAL_STATE = {
  isLoadingRepositories: false,
  repositories: [],
  repositoriesError: null,
};

/**
 * @function getRepositoriesFail
 *
 * @description
 * handle the GET_REPOSITORIES_FAIL action
 *
 * @param {Object} state the current state of the reducer
 * @param {Error} payload the payload of the action
 * @returns {Object} the updated state of the reducer
 */
const getRepositoriesFail = (state, {payload: repositoriesError}) => ({
  ...state,
  isLoadingRepositories: false,
  repositoriesError,
});

/**
 * @function getRepositoriesPending
 *
 * @description
 * handle the GET_REPOSITORIES_PENDING action
 *
 * @param {Object} state the current state of the reducer
 * @returns {Object} the updated state of the reducer
 */
const getRepositoriesPending = (state) => ({
  ...state,
  isLoadingRepositories: true,
});

/**
 * @function getRepositoriesSuccess
 *
 * @description
 * handle the GET_REPOSITORIES_SUCCESS action
 *
 * @param {Object} state the current state of the reducer
 * @param {Array<Object>} payload the payload of the action
 * @returns {Object} the updated state of the reducer
 */
const getRepositoriesSuccess = (state, {payload: repositories}) => ({
  ...state,
  isLoadingRepositories: false,
  repositories,
  repositoriesError: null,
});

export default handleActions(
  {
    [ACTION_TYPES.GET_REPOSITORIES_FAIL]: getRepositoriesFail,
    [ACTION_TYPES.GET_REPOSITORIES_PENDING]: getRepositoriesPending,
    [ACTION_TYPES.GET_REPOSITORIES_SUCCESS]: getRepositoriesSuccess,
  },
  INITIAL_STATE
);
