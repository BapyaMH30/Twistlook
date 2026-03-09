const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, city, state } = req.body;

    // Check if user exists (both legacy and new email fields)
    const existingUser = await User.findOne({ $or: [{ email }, { EMAIL: email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create user
    const user = new User({ name, email, password, phone, city, state });
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user (check both legacy and new email fields)
    const user = await User.findOne({ $or: [{ email }, { EMAIL: email }] });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      user: { id: user._id, name: user.displayName, email: user.displayEmail },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  const user = req.user;
  res.json({
    id: user._id,
    name: user.displayName,
    email: user.displayEmail,
    phone: user.displayPhone,
    location: user.displayLocation,
    type: user.TYPE || user.role
  });
};
