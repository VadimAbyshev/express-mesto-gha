const router = require('express').Router();
const {login} = require('../controllers/users')
// const { celebrate, Joi } = require('celebrate');

// const { login } = require('../controllers/users');

router.post('/', login)

// router.post('/', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().min(2).max(30).required(),
//   }),
// }), login);

module.exports = router;