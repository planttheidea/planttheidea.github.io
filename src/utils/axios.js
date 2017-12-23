// external dependencies
import axios from 'axios';

/**
 * @function getCachedData
 *
 * @description
 * get the data for the session storage key and URL, either from cache or from the API (storing it in cache)
 *
 * @param {string} key the session storage key
 * @param {string} url the URL to GET from
 * @returns {Promise}
 */
export const getCachedData = async (key, url) => {
  const existingProfile = window.sessionStorage.getItem(key);

  if (existingProfile !== null) {
    try {
      return await JSON.parse(existingProfile);
    } catch (error) {} // eslint-disable-line
  }

  const response = await axios.get(url);

  window.sessionStorage.setItem(key, JSON.stringify(response.data));

  return response.data;
};

/**
 * @function setAxiosDefaults
 *
 * @description
 * set the defaults for the axios API calls
 */
export const setAxiosDefaults = () => {
  axios.defaults.baseURL = 'https://api.github.com';

  axios.defaults.headers.common.Accept = 'application/vnd.github.v3+json';
};
