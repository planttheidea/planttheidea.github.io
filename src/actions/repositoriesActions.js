// external dependencies
import createConstants from 'namespace-constants';
import {createAction} from 'redux-actions';

// apis
import * as usersApi from 'apis/usersApi';

export const ACTION_TYPES = createConstants('repositories', [
  'GET_REPOSITORIES_FAIL',
  'GET_REPOSITORIES_PENDING',
  'GET_REPOSITORIES_SUCCESS'
]);

export const getRepositoriesFail = createAction(ACTION_TYPES.GET_REPOSITORIES_FAIL);
export const getRepositoriesPending = createAction(ACTION_TYPES.GET_REPOSITORIES_PENDING);
export const getRepositoriesSuccess = createAction(ACTION_TYPES.GET_REPOSITORIES_SUCCESS);

/**
 * @function getRepositories
 *
 * @description
 * get the list of repositories for the user
 *
 * @returns{function(function): Promise}
 */
export const getRepositories = () => {
  return async (dispatch) => {
    dispatch(getRepositoriesPending());

    try {
      const data = await usersApi.getUserRepositories();

      dispatch(getRepositoriesSuccess(data));
    } catch (error) {
      dispatch(getRepositoriesFail(error));
    }
  };
};
