// external dependencies
import moize from 'moize';

export const getDate = moize.maxSize(100)((dateString) => {
  return new Date(dateString);
});
