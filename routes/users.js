const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  postUser,
} = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:id', getUser);
router.post('/users', postUser);
module.exports = router;
