const express = require('express');
const {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  getUserReviews
} = require('../controllers/reviewController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/user/:userId', getUserReviews);
router.get('/:propertyType/:propertyId', getReviews);
router.post('/:propertyType/:propertyId', auth, createReview);
router.put('/:reviewId', auth, updateReview);
router.delete('/:reviewId', auth, deleteReview);

module.exports = router;
