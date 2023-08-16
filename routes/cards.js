const router = require('express').Router();

const {
  createCard, getCard, deleteCard, setLike, removeLike,
} = require('../controllers/cards');

router.post('/', createCard);
router.get('/', getCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', setLike);
router.delete('/:cardId/likes', removeLike);

module.exports = router;
