const fs = require('fs');
const path = require('path');

const SCRIPT_PATH = path.join(__dirname, '/resources/scripts');
const STYLESHEET_PATH = path.join(__dirname, '/resources/stylesheets');
const ALLOW_SCANING_DIRS = ['pages'];
/**
 * Extract file name in file string
 *
 * @param {string} fileName
 * @returns {string}
 */
const extractFileName = (file) => {
  return file.split('.').shift();
};

/**
 * Scan resources items return mapped entries from resources to public
 * -> Scanned file is directory, filter with defined filter then recursive scan sub-directory
 * -> Otherwise, make new entry
 *
 * @param {string} currentPath
 * @param {string} distDir
 * @param {string} parentDirectory
 * @param {object} entries
 * @returns {object}
 */
const scanEntries = (currentPath, distDir = 'js', parentDirectory = '', entries = {}) => {
  const entities = fs.readdirSync(currentPath);

  const directories = [];
  const files = [];

  // Filter and classify directory's entities
  entities.length && entities.forEach((entity) => {
    const pathToItem = path.join(currentPath, entity);
    const isDirectory = fs.statSync(pathToItem).isDirectory();

    if (isDirectory) {
      if (ALLOW_SCANING_DIRS.includes(entity) || ALLOW_SCANING_DIRS.includes(parentDirectory)) {
        directories.push(entity);
      }
    } else {
      files.push(entity);
    }
  });

  // Scan sub directories
  directories.forEach((directory) => {
    const subPath = path.join(currentPath, directory);
    const subDistDirectory = parentDirectory ? path.join(distDir, parentDirectory) : distDir;
    const subEntries = scanEntries(subPath, subDistDirectory, directory, entries);

    entries = { ...entries, ...subEntries };
  });

  // Handle files
  files.forEach((file) => {
    const fileName = extractFileName(file);
    const distPath = parentDirectory ? path.join(distDir, parentDirectory) : distDir;
    entries[path.join(distPath, fileName)] = path.join(currentPath, file);
  });

  return entries;
};
module.exports = () => ({
  ...scanEntries(SCRIPT_PATH),
  ...scanEntries(STYLESHEET_PATH, 'css')
});
