const User = require('../models/User');
const { LandSite, ConstructionSite } = require('../models/Property');

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -PASSWORD');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user._id,
      name: user.displayName,
      email: user.displayEmail,
      phone: user.displayPhone,
      location: user.displayLocation,
      type: user.TYPE || user.role,
      groupName: user.GROUP_NAME,
      createdAt: user.createdAt || user.DATE
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = async (req, res) => {
  try {
    // Check if user is updating their own profile
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ error: 'Not authorized to update this profile' });
    }

    const { name, phone, address, city, state } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, address, city, state },
      { new: true }
    ).select('-password -PASSWORD');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user._id,
      name: user.displayName,
      email: user.displayEmail,
      phone: user.displayPhone,
      location: user.displayLocation,
      type: user.TYPE || user.role
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get user's listings
// @route   GET /api/users/:id/listings
// @access  Public
exports.getUserListings = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find listings by email (matches POSTED_BY field format)
    const userEmail = user.email || user.EMAIL;
    const emailPattern = new RegExp(userEmail, 'i');

    const landListings = await LandSite.find({ POSTED_BY: emailPattern });
    const constructionListings = await ConstructionSite.find({ POSTED_BY: emailPattern });

    res.json({
      land: landListings,
      construction: constructionListings,
      totalCount: landListings.length + constructionListings.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete user account
// @route   DELETE /api/users/:id
// @access  Private
exports.deleteUser = async (req, res) => {
  try {
    // Check if user is deleting their own account
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ error: 'Not authorized to delete this account' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin' && req.user.TYPE !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const users = await User.find()
      .select('-password -PASSWORD')
      .sort({ _id: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
