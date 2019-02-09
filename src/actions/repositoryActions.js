// external dependencies
import {
  identity,
  identitySecond,
} from 'identitate';
import createConstants from 'namespace-constants';
import {createAction} from 'redux-actions';

// apis
import * as reposApi from 'apis/reposApi';

export const ACTION_TYPES = createConstants('repository', [
  'CLEAR_README',
  'GET_README_FAIL',
  'GET_README_PENDING',
  'GET_README_SUCCESS',
]);

export const clearReadme = createAction(ACTION_TYPES.CLEAR_README, () => {});

export const getReadmeFail = createAction(ACTION_TYPES.GET_README_FAIL, identity, identitySecond);
export const getReadmePending = createAction(ACTION_TYPES.GET_README_PENDING, identity, identitySecond);
export const getReadmeSuccess = createAction(ACTION_TYPES.GET_README_SUCCESS, identity, identitySecond);

/**
 * @function getReadme
 *
 * @description
 * get the README information for the given repository
 *
 * @param {string} repositoryName the name of the repository
 * @returns {function(function): Promise}
 */
export const getReadme = (repositoryName) => async (dispatch) => {
  dispatch(getReadmePending(null, repositoryName));

  try {
    const data = await reposApi.getRepositoryReadme(repositoryName);

    dispatch(getReadmeSuccess(data, repositoryName));
  } catch (error) {
    dispatch(getReadmeFail(error, repositoryName));
  }
};
