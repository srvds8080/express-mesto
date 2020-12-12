const router = require('express').Router();
const getAllCards = require('../controllers/cards');

router.get('/cards', getAllCards);

module.exports = router;