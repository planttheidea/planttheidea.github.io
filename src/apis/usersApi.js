// constants
import {SESSION_STORAGE_KEY_PREFIX} from 'constants/axios';

// utils
import {getCachedData} from 'utils/axios';

export const USERS_URL = 'https://api.github.com/users/planttheidea';

/**
 * @function getUserProfile
 *
 * @description
 * get the profile for the user
 *
 * @returns {Promise}
 */
export const getUserProfile = async () => {
  return await getCachedData(`${SESSION_STORAGE_KEY_PREFIX}:userProfile`, USERS_URL);
};

/**
 * @function getUserRepositories
 *
 * @description
 * get the repositories for the user
 *
 * @returns {Promise}
 */
export const getUserRepositories = async () => {
  return await getCachedData(`${SESSION_STORAGE_KEY_PREFIX}:userRepositories`, `${USERS_URL}/repos?per_page=1000`);
};
