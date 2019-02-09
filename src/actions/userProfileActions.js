// external dependencies
import createConstants from 'namespace-constants';
import {createAction} from 'redux-actions';

// apis
import * as usersApi from 'apis/usersApi';

export const ACTION_TYPES = createConstants('userProfile', [
  'GET_USER_PROFILE_FAIL',
  'GET_USER_PROFILE_PENDING',
  'GET_USER_PROFILE_SUCCESS',
]);

export const getUserProfileFail = createAction(ACTION_TYPES.GET_USER_PROFILE_FAIL);
export const getUserProfilePending = createAction(ACTION_TYPES.GET_USER_PROFILE_PENDING);
export const getUserProfileSuccess = createAction(ACTION_TYPES.GET_USER_PROFILE_SUCCESS);

/**
 * @function getUserProfile
 *
 * @description
 * get the profile for the user
 *
 * @returns {function(function): Promise}
 */
export const getUserProfile = () => async (dispatch) => {
  dispatch(getUserProfilePending());

  try {
    const data = await usersApi.getUserProfile();

    dispatch(getUserProfileSuccess(data));
  } catch (error) {
    dispatch(getUserProfileFail(error));
  }
};
