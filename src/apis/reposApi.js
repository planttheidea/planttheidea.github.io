// constants
import {SESSION_STORAGE_KEY_PREFIX} from 'constants/axios';

// utils
import {getCachedData} from 'utils/axios';

export const REPO_URL = 'https://api.github.com/repos/planttheidea';

/**
 * @function getRepositoryReadme
 *
 * @description
 * get the repository README information
 *
 * @param {string} repositoryName the name of the repository
 * @returns {Promise}
 */
export const getRepositoryReadme = async (repositoryName) => {
  return await getCachedData(
    `${SESSION_STORAGE_KEY_PREFIX}:repositoryReadme.${repositoryName}`,
    `${REPO_URL}/${repositoryName}/readme`
  );
};
