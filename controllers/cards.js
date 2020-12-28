const Card = require('../models/card');
// errors codes
const {
  REGEX_URL,
  OK_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  CREATE_CODE,
  BAD_REQUEST_CODE,
} = require('../utils/constants');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(OK_CODE).send(cards))
    .catch((error) => res.status(INTERNAL_SERVER_ERROR_CODE).send(error));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  if (!REGEX_URL.test(link)) {
    res.status(BAD_REQUEST_CODE).send({ message: `${link} не является URL` });
  } else if (!name || name.length < 2) {
    res.status(BAD_REQUEST_CODE).send({ message: 'Значение "name" обязательно и не может быть короче двух символов' });
  } else {
    Card.create({
      name,
      link,
      owner: {
        _id,
      },
    })
      .then((card) => res.status(CREATE_CODE).send({ data: card }))
      .catch(() => {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
      });
  }
};

const deleteCard = (req, res) => Card.findByIdAndRemove(req.params.cardId)
  .then(() => res.status(OK_CODE).send({ message: 'card deleted' }))
  .catch(() => res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' }));

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
};
