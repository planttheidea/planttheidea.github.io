/**
 * @function getParsedReadme
 *
 * @description
 * parsed the README content and return it
 *
 * @param {Object} readme the readme information
 * @param {string} readme.content the base64-encoded README file markdown content
 * @returns {string|null} the parsed content
 */
export const getParsedReadme = (readme) => {
  if (!readme) {
    return null;
  }

  try {
    return atob(readme.content);
  } catch (error) {
    console.error(error); // eslint-disable-line

    return null;
  }
};
