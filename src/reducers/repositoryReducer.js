// external dependencies
import {handleActions} from 'redux-actions';

// actions
import {ACTION_TYPES} from 'actions/repositoryActions';

export const INITIAL_STATE = {
  isLoadingReadme: false,
  projectName: null,
  readme: null,
  readmeError: null
};

/**
 * @function clearReadme
 *
 * @description
 * clear the active readme
 *
 * @param {Object} state the current state of the reducer
 * @returns {Object} the updated state of the reducer
 */
const clearReadme = (state) => {
  return {
    ...state,
    projectName: null,
    readme: null
  };
};

/**
 * @function getReadmeFail
 *
 * @description
 * handle the GET_README_FAIL action
 *
 * @param {Object} state the current state of the reducer
 * @param {Error} payload the payload of the action
 * @returns {Object} the updated state of the reducer
 */
const getReadmeFail = (state, {payload: readmeError}) => {
  return {
    ...state,
    isLoadingReadme: false,
    readmeError
  };
};

/**
 * @function getReadmePending
 *
 * @description
 * handle the GET_README_PENDING action
 *
 * @param {Object} state the current state of the reducer
 * @param {string} meta the meta of the action
 * @returns {Object} the updated state of the reducer
 */
const getReadmePending = (state, {meta: projectName}) => {
  return {
    ...state,
    isLoadingReadme: true,
    projectName
  };
};

/**
 * @function getReadmeSuccess
 *
 * @description
 * handle the GET_README_SUCCESS action
 *
 * @param {Object} state the current state of the reducer
 * @param {Object} payload the payload of the action
 * @returns {Object} the updated state of the reducer
 */
const getReadmeSuccess = (state, {payload: readme}) => {
  return {
    ...state,
    isLoadingReadme: false,
    readme,
    readmeError: null
  };
};

export default handleActions(
  {
    [ACTION_TYPES.CLEAR_README]: clearReadme,
    [ACTION_TYPES.GET_README_FAIL]: getReadmeFail,
    [ACTION_TYPES.GET_README_PENDING]: getReadmePending,
    [ACTION_TYPES.GET_README_SUCCESS]: getReadmeSuccess
  },
  INITIAL_STATE
);
