const User = require('../models/user');
// errors codes
const {
  OK_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  CREATE_CODE,
  BAD_REQUEST_CODE,
  NOTFUOND_CODE,
  REGEX_URL,
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
  if (!REGEX_URL.test(avatar)) {
    res.status(BAD_REQUEST_CODE).send({ message: `${avatar} не является URL` });
  } else if (!name || name < 2) {
    res.status(BAD_REQUEST_CODE).send({ message: 'Значение "name" обязательно и не может быть короче двух символов' });
  } else {
    User.create({ name, about, avatar })
      .then((user) => res.status(CREATE_CODE).send(user))
      .catch(() => res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: 'На сервере произошла ошибка' }));
  }
};

const updateUser = (req, res) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  if (!name || name < 2) {
    res.status(BAD_REQUEST_CODE).send({ message: 'Значение "name" обязательно и не может быть короче двух символов' });
  } else {
    User.findByIdAndUpdate(_id, { name, about }, { new: true })
      .then((user) => res.status(OK_CODE).send(user))
      .catch(() => res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: 'На сервере произошла ошибка' }));
  }
};

const updateUserAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  if (!REGEX_URL.test(avatar)) {
    res.status(BAD_REQUEST_CODE).send({ message: `${avatar} не является URL` });
  } else {
    User.findByIdAndUpdate(_id, { avatar }, { new: true })
      .then((user) => res.status(OK_CODE).send(user))
      .catch(() => res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: 'На сервере произошла ошибка' }));
  }
};

module.exports = {
  getAllUsers,
  getUser,
  postUser,
  updateUser,
  updateUserAvatar,
};
