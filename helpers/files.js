const fsPromises = require('fs').promises;

const getDataFromFile = (pathToFile) => fsPromises.readFile(pathToFile, { encoding: 'utf-8' })
  .then((data) => JSON.parse(data))
  // eslint-disable-next-line no-console
  .catch((error) => console.error(error));

module.exports = getDataFromFile;
