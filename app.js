const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb+srv://srvds:1234qwer@cluster0.vzqr2.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '5fe64d1aef5394976c2707b0',
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
