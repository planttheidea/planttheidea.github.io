// external dependencies
import {identity, identitySecond} from 'identitate';
import createConstants from 'namespace-constants';
import {createAction} from 'redux-actions';

// apis
import * as reposApi from 'apis/reposApi';

export const ACTION_TYPES = createConstants('repository', [
  'CLEAR_README',
  'GET_README_FAIL',
  'GET_README_PENDING',
  'GET_README_SUCCESS'
]);

export const clearReadme = createAction(ACTION_TYPES.CLEAR_README, () => {});

export const getReadmeFail = createAction(ACTION_TYPES.GET_README_FAIL, identity, identitySecond);
export const getReadmePending = createAction(ACTION_TYPES.GET_README_PENDING, identity, identitySecond);
export const getReadmeSuccess = createAction(ACTION_TYPES.GET_README_SUCCESS, identity, identitySecond);

export const getReadme = (repositoryName) => {
  return async (dispatch) => {
    dispatch(getReadmePending(null, repositoryName));

    try {
      const data = await reposApi.getRepositoryReadme(repositoryName);

      dispatch(getReadmeSuccess(data, repositoryName));
    } catch (error) {
      dispatch(getReadmeFail(error, repositoryName));
    }
  };
};
