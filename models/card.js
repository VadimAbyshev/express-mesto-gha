const mongoose = require('mongoose');
const urlRegex = require('../utils/constants')

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    minlength: [2, 'Минимум 2 символа'],
    maxlength: [30, 'Максимальное количество символов 30'],
  },
  link: {
    type: String,
    required: [true, 'В поле должен быть URL изображения'],
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: 'URL неверный',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  ],
  createdAt: {
    type: Date,
    default: Date.now,

  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
