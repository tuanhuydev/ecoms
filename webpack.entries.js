const fs = require('fs');
const path = require('path');

const SCRIPT_PATH = path.join(__dirname, '/resources/scripts');
const STYLESHEET_PATH = path.join(__dirname, '/resources/stylesheets');

/**
 * Split file name if it's directory then it doesn't contain extension
 *
 * @param {string} fileName
 * @returns {boolean}
 */
const extractFileName = (fileName) => {
  const nameParts = fileName.split('.');
  const hasExtension = nameParts.length === 1;
  return {
    fileName: nameParts[0],
    extension: hasExtension ? false : nameParts[nameParts.length - 1]
  };
};
const ALLOW_SCANING_DIRS = ['pages'];

/**
 * Scan resources files return mapped entries from resources to public
 * -> Scanned file is directory, filter with defined filter then recursive scan sub-directory
 * -> Otherwise, make new entry
 *
 * @param {string} path
 * @param {string} distDir
 * @param {string} parentDir
 * @param {object} entries
 * @returns {object}
 */
const scanEntries = (path, distDir = 'js', parentDir = '', entries = {}) => {
  const files = fs.readdirSync(path);
  files.length && files.forEach(file => {
    const { fileName, extension } = extractFileName(file);
    if (!extension) {
      const subPath = `${path}/${fileName}`;
      let subEntries = [];

      if (ALLOW_SCANING_DIRS.includes(fileName)) {
        subEntries = scanEntries(subPath, distDir, fileName, entries);
      } else if (ALLOW_SCANING_DIRS.includes(parentDir)) {
        subEntries = scanEntries(subPath, `${distDir}/${parentDir}`, fileName, entries);
      }

      entries = { ...entries, ...subEntries };
    } else if (extension && parentDir) {
      entries[`${distDir}/${parentDir}/${fileName}`] = `${path}/${file}`;
    } else {
      entries[`${distDir}/${fileName}`] = `${path}/${file}`;
    }
  });
  return entries;
};

module.exports = {
  ...scanEntries(SCRIPT_PATH),
  ...scanEntries(STYLESHEET_PATH, 'css')
};
