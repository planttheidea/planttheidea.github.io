// external dependencies
import {handleActions} from 'redux-actions';

// actions
import {ACTION_TYPES} from 'actions/userProfileActions';

export const INITIAL_STATE = {
  isLoadingUserProfile: false,
  userProfile: {},
  userProfileError: null,
};

/**
 * @function getUserProfileFail
 *
 * @description
 * handle the GET_USER_PROFILE_FAIL action
 *
 * @param {Object} state the current state of the reducer
 * @param {Error} payload the payload of the action
 * @returns {Object} the updated state of the reducer
 */
const getUserProfileFail = (state, {payload: userProfileError}) => ({
  ...state,
  isLoadingUserProfile: false,
  userProfileError,
});

/**
 * @function getUserProfilePending
 *
 * @description
 * handle the GET_USER_PROFILE_PENDING action
 *
 * @param {Object} state the current state of the reducer
 * @returns {Object} the updated state of the reducer
 */
const getUserProfilePending = (state) => ({
  ...state,
  isLoadingUserProfile: true,
});

/**
 * @function getUserProfileSuccess
 *
 * @description
 * handle the GET_USER_PROFILE_SUCCESS action
 *
 * @param {Object} state the current state of the reducer
 * @param {Object} payload the payload of the action
 * @returns {Object} the updated state of the reducer
 */
const getUserProfileSuccess = (state, {payload: userProfile}) => ({
  ...state,
  isLoadingUserProfile: false,
  userProfile,
  userProfileError: null,
});

export default handleActions(
  {
    [ACTION_TYPES.GET_USER_PROFILE_FAIL]: getUserProfileFail,
    [ACTION_TYPES.GET_USER_PROFILE_PENDING]: getUserProfilePending,
    [ACTION_TYPES.GET_USER_PROFILE_SUCCESS]: getUserProfileSuccess,
  },
  INITIAL_STATE
);
