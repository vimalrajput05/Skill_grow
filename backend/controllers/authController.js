const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

// @desc Register user
// @route POST /api/auth/register
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { fullName, mobile, password, village, state } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ mobile });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Mobile already registered' });
    }

    const user = await User.create({ fullName, mobile, password, village, state });
    
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        mobile: user.mobile,
        village: user.village,
        state: user.state,
        language: user.language,
        trustScore: user.trustScore
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Login user
// @route POST /api/auth/login
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { mobile, password } = req.body;

    const user = await User.findOne({ mobile }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid mobile or password' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        mobile: user.mobile,
        village: user.village,
        state: user.state,
        language: user.language,
        trustScore: user.trustScore,
        earningsThisMonth: user.earningsThisMonth
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get current user
// @route GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        mobile: user.mobile,
        village: user.village,
        state: user.state,
        language: user.language,
        trustScore: user.trustScore,
        earningsThisMonth: user.earningsThisMonth,
        skills: user.skills,
        badges: user.badges
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update language
// @route PUT /api/auth/update-language
exports.updateLanguage = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { language: req.body.language },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      user: {
        id: user._id,
        language: user.language
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update profile
// @route PUT /api/auth/update-profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        village: user.village,
        state: user.state
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

