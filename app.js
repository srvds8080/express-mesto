const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const { urlBD } = require('./utils/constants.js');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(urlBD, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '5fe85b2cb6e8df430595019e',
  };
  next();
});
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use((req, res) => {
  res
    .status(404)
    .send({ message: 'Запрашиваемый ресурс не найден' });
});
app.listen(PORT);
