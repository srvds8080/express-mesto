const express = require('express');
const path = require('path');
const { PORT = 3000 } = process.env;
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const createError = require('http-errors');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use((req, res) => {
  res.send(createError(404, 'Запрашиваемый ресурс не найден'));
});
app.listen(PORT);
