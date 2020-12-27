const User = require('../models/user');
// errors codes
const {
  OK_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  CREATE_CODE,
  BAD_REQUEST_CODE,
  NOTFUOND_CODE,
} = require('../utils/constants');

const getAllUsers = (req, res) => {
  User.find()
    .then((users) => res.status(OK_CODE).send(users))
    .catch((error) => res.status(INTERNAL_SERVER_ERROR_CODE).send(error));
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      const error = new Error('Пользователь по заданному id отсутствует в базе');
      error.statusCode = NOTFUOND_CODE;
      throw error;
    })
    .then((user) => res.status(OK_CODE).send(user))
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        res.status(BAD_REQUEST_CODE).send({ message: `Неверный формат ID: id должен быть 24-значным шестнадцатеричным числом. ${error.reason}` });
      } else if (error.statusCode === NOTFUOND_CODE) {
        res.status(NOTFUOND_CODE).send({ message: error.message });
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATE_CODE).send(user))
    .catch((error) => res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: `something went wrong, error: ${error}` }));
};

module.exports = { getAllUsers, getUser, postUser };
