const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const signInRouter = require('./signIn');
const signUpRouter = require('./signUp');

const NotFound = require('../errors/NotFound');

router.use('/api/', signInRouter);
router.use('/api/', signUpRouter);
router.use('/api/users', userRouter);
router.use('/api/cards', cardRouter);
router.use((req, res, next) => {
  next(new NotFound('NOT FOUND'));
});

module.exports = router;
