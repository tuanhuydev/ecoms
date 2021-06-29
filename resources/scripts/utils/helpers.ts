/**
 * Generate random string base on defined length
 * @param {number} length
 * @returns {string}
 */
export const makeRandomString = (length: number): string => {
  return Math.random().toString(36).substring(2, length);
};
