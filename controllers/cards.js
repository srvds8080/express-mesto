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
        }
        res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
      });
  }
};

const deleteCard = (req, res) => Card
  .findByIdAndRemove(req.params.cardId)
  .then((card) => {
    if (!card) {
      res.status(NOTFUOND_CODE).send({ message: 'такой карточки не существует' });
    }
    res.status(OK_CODE).send({ message: 'карточка удалена' });
  })
  .catch(() => res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' }));

const putLike = (req, res) => {
  Card
    .findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: [req.user._id] } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(NOTFUOND_CODE).send({ message: 'Такой карточки не существует' });
      }
      res.status(OK_CODE).send(`\n cardLikes: ${card}`);
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' }));
};
const removeLike = (req, res) => {
  Card
    .findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(NOTFUOND_CODE).send({ message: 'Такой карточки не существует' });
      }
      res.status(OK_CODE).send(card);
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' }));
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,
};
