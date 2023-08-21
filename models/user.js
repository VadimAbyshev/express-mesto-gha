const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const urlRegex = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    required: [true, 'Поле должно быть заполнено'],
    minlength: [2, 'Минимум 2 символа'],
    maxlength: [30, 'Максимальное количество символов 30'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    required: true,
    minlength: [2, 'Минимум 2 символа'],
    maxlength: [30, 'Максимальное количество символов 30'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: true,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: 'Введите URL',
    },
  },
  email: {
    type: String,
    required: [true, 'Заполните поле email'],
    unique: true,
    validate: {
      validator: (email) => (
        validator.isEmail(email)
      ),
      message: 'Введите верный Email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
