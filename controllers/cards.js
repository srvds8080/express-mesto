const Card = require('../models/card');
// errors codes
const {
  REGEX_URL,
  OK_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  CREATE_CODE,
  BAD_REQUEST_CODE,
  NOTFUOND_CODE,
} = require('../utils/constants');

const {
  catchError,
} = require('../utils/errors');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(OK_CODE).send(cards))
    .catch((error) => res.status(INTERNAL_SERVER_ERROR_CODE).send(error));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  if (!link) {
    res.status(BAD_REQUEST_CODE).send({ message: 'Ссылка на изобржение обязательна' });
  } else if (!name || name.length < 2) {
    res.status(BAD_REQUEST_CODE).send({ message: 'Значение "name" обязательно и не может быть короче двух символов' });
  } else if (!REGEX_URL.test(link)) {
    res.status(BAD_REQUEST_CODE).send({ message: `${link} не является действительной ссылкой на изображение` });
  } else {
    Card.create({
      name,
      link,
      owner: {
        _id,
      },
    })
      .then((card) => res.status(CREATE_CODE).send({ data: card }))
      .catch((err) => {
        if (/Validator\sfailed\sfor\spath\s`link`/ig.test(err.message)) {
          res.status(BAD_REQUEST_CODE).send({ message: `${link} не является действительной ссылкой на изображение` });
          return;
        }
        res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
      });
  }
};

const deleteCard = (req, res) => Card
  .findByIdAndRemove(req.params.cardId)
  .orFail(() => {
    const error = new Error('такой карточки не существует');
    error.statusCode = NOTFUOND_CODE;
    throw error;
  })
  .then(() => {
    res.status(OK_CODE).send({ message: 'Карточка успешно удалена' });
  })
  .catch((error) => catchError(error, res));

const putLike = (req, res) => {
  Card
    .findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: [req.user._id] } }, { new: true })
    .orFail(() => {
      const error = new Error('такой карточки не существует');
      error.statusCode = NOTFUOND_CODE;
      throw error;
    })
    .then((card) => {
      res.status(OK_CODE).send(card);
    })
    .catch((error) => catchError(error, res));
};
const removeLike = (req, res) => {
  Card
    .findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const error = new Error('такой карточки не существует');
      error.statusCode = NOTFUOND_CODE;
      throw error;
    })
    .then((card) => {
      res.status(OK_CODE).send(card);
    })
    .catch((error) => catchError(error, res));
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,
};
