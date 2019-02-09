// external dependencies
import moize from 'moize';

/**
 * @function getDate
 *
 * @description
 * based on the dateString, return the JS Date object for it
 *
 * @param {string} dateString the date as an ISO string
 * @returns {Date} the date object
 */
export const getDate = moize.maxSize(100)((dateString) => new Date(dateString));
