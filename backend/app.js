const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);

app.use(cors({
    origin: ['https://mesto-suhachov.nomoredomains.rocks','http://mesto-suhachov.nomoredomains.rocks','http://localhost:3000'],
    credentials: true,
  }),
);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(error);

mongoose
  .connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })
  .then(() => {
    console.log('База данных подключена');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
