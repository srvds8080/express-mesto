const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  postUser,
  updateUser,
} = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:id', getUser);
router.post('/users', postUser);
router.patch('/users/me', updateUser);
module.exports = router;
