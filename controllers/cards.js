const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');
const getDataFromFile = require('../helpers/files');

const getAllCards = (req, res) => getDataFromFile(dataPath)
  .then((cards) => res.status(200).send(cards))
  .catch((error) => res.status(500).send(error));

module.exports = getAllCards;
