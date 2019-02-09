// external dependencies
import orderBy from 'lodash/orderBy';

/**
 * @function getFilteredRepositories
 *
 * @description
 * get the repositories filtered by the search value
 *
 * @param {Array<Object>} repositories the complete list of repositories
 * @param {string} searchValue the value to search for
 * @returns {Array<Object>} the filtered list of repositories
 */
export const getFilteredRepositories = (repositories, searchValue) => {
  const orderedRepositories = orderBy(
    repositories.filter(({private: isPrivate}) => !isPrivate),
    [
      ({stargazers_count}) => stargazers_count,
      ({updated_at}) => updated_at,
    ],
    ['desc', 'desc']
  );

  if (!searchValue) {
    return orderedRepositories;
  }

  const searchName = searchValue.toLowerCase();

  return orderedRepositories.filter(({name}) => name.toLowerCase().indexOf(searchName) === 0);
};
