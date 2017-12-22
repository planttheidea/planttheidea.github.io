// external dependencies
import {handleActions} from 'redux-actions';

// actions
import {ACTION_TYPES} from 'actions/userProfileActions';

export const INITIAL_STATE = {
  isLoadingUserProfile: false,
  userProfile: {},
  userProfileError: null
};

const getUserProfileFail = (state, {payload: userProfileError}) => {
  return {
    ...state,
    isLoadingUserProfile: false,
    userProfileError
  };
};

const getUserProfilePending = (state) => {
  return {
    ...state,
    isLoadingUserProfile: true
  };
};

const getUserProfileSuccess = (state, {payload: userProfile}) => {
  return {
    ...state,
    isLoadingUserProfile: false,
    userProfile,
    userProfileError: null
  };
};

export default handleActions(
  {
    [ACTION_TYPES.GET_USER_PROFILE_FAIL]: getUserProfileFail,
    [ACTION_TYPES.GET_USER_PROFILE_PENDING]: getUserProfilePending,
    [ACTION_TYPES.GET_USER_PROFILE_SUCCESS]: getUserProfileSuccess
  },
  INITIAL_STATE
);
