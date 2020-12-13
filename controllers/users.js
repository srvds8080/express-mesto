const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');
const getDataFromFile = require('../helpers/files');

const getAllUsers = (req, res) => getDataFromFile(dataPath)
  .then((users) => res.status(200).send(users))
  .catch((error) => res.status(500).send(error));

const getUser = (req, res) => getDataFromFile(dataPath)
  .then((users) => users.find((user) => user._id === req.params.id))
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.status(200).send(user);
  })
  .catch((e) => res.status(500).send({ error: `somthing went wrong, error: ${e}` }));

module.exports = { getAllUsers, getUser };
