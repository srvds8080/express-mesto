const router = require('express').Router();
const { getAllUsers, getUser } = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:id', getUser);
module.exports = router;
