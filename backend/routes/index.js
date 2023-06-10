const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const signInRouter = require('./signIn');
const signUpRouter = require('./signUp');

const { requestLogger, errorLogger } = require('../middlewares/logger');

const NotFound = require('../errors/NotFound');
const {logger} = require("express-winston");

router.use(requestLogger);
router.use(logger);
router.use('/', signInRouter);
router.use('/', signUpRouter);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use(errorLogger);

router.use((req, res, next) => {
  next(new NotFound('NOT FOUND'));
});

module.exports = router;
