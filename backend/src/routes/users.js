const express = require('express');
const {
  getUser,
  updateUser,
  getUserListings,
  deleteUser,
  getAllUsers
} = require('../controllers/userController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getAllUsers);
router.get('/:id', getUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);
router.get('/:id/listings', getUserListings);

module.exports = router;
