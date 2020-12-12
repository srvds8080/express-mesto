const express = require('express');
const path = require('path');
const { PORT = 3000 } = process.env;
const usersRouter = require('./routes/users.js');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT} ${path.join(__dirname, 'public')}`);
});
