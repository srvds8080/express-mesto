const {
  INTERNAL_SERVER_ERROR_CODE,
  BAD_REQUEST_CODE,
  NOTFUOND_CODE,
} = require('./constants');

const catchError = (error, res) => {
  if (error.name === 'CastError') {
    res.status(BAD_REQUEST_CODE).send({ message: 'переданы некоректные данные' });
  } else if (error.statusCode === NOTFUOND_CODE) {
    res.status(NOTFUOND_CODE).send({ message: error.message });
  } else {
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports = {
  catchError,
};
