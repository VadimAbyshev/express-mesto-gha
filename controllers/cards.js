const Card = require('../models/card');

// Создание карточки
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))

    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: error.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.getCard = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

// Удалить карточку
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный  _id' });
      } else if (error.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Карточка с таким _id не существует' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Установка лайка
module.exports.setLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: 'true' })
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный  _id' });
      } else if (error.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Карточка с таким _id не существует' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Снятие лайка
module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: 'true' })
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный  _id' });
      } else if (error.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Карточка с таким _id не существует' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
