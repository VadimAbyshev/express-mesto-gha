const router = require('express').Router();

const cardsRouter = require('./cards');
const usersRouter = require('./users');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const auth = require('../middlewares/auth');

// const NotFoundError = require('../errors/NotFoundError');

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use(auth);
router.use('/cards', cardsRouter);
router.use('/users', usersRouter);

router.use('*', (req, res) => {
    res.status(404).send({ message: 'Страница не найдена' });
  });

module.exports = router;