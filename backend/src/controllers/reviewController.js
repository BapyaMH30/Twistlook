const Review = require('../models/Review');

// @desc    Get reviews for a property
// @route   GET /api/reviews/:propertyType/:propertyId
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    const { propertyType, propertyId } = req.params;

    const reviews = await Review.find({ propertyId, propertyType })
      .populate('userId', 'name NAME email EMAIL')
      .sort({ createdAt: -1 });

    // Calculate average rating
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    res.json({
      reviews,
      avgRating: Math.round(avgRating * 10) / 10,
      count: reviews.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create a review
// @route   POST /api/reviews/:propertyType/:propertyId
// @access  Private
exports.createReview = async (req, res) => {
  try {
    const { propertyType, propertyId } = req.params;
    const { rating, comment } = req.body;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Check if user already reviewed this property
    const existingReview = await Review.findOne({
      propertyId,
      propertyType,
      userId: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this property' });
    }

    const review = new Review({
      propertyId,
      propertyType,
      userId: req.user._id,
      rating,
      comment
    });

    await review.save();
    await review.populate('userId', 'name NAME email EMAIL');

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:reviewId
// @access  Private
exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Check ownership
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this review' });
    }

    // Validate rating if provided
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    if (rating) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    await review.save();
    await review.populate('userId', 'name NAME email EMAIL');

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:reviewId
// @access  Private
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Check ownership
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this review' });
    }

    await Review.findByIdAndDelete(req.params.reviewId);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get user's reviews
// @route   GET /api/reviews/user/:userId
// @access  Public
exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
