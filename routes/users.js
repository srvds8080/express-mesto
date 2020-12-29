const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  postUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:id', getUser);
router.post('/users', postUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);
module.exports = router;
