const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg, errors: errors.array() });
  }
  try {
    const { fullName, mobile, password, village, state } = req.body;
    const userExists = await User.findOne({ mobile });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Mobile already registered' });
    }
    const user = await User.create({ fullName, mobile, password, village, state });
    const token = generateToken(user._id);
    res.status(201).json({
      success: true, token,
      user: { id: user._id, fullName: user.fullName, mobile: user.mobile, village: user.village, state: user.state, language: user.language, trustScore: user.trustScore }
    });
  } catch (error) {
    console.error('Register error:', error);
    if (error.code === 11000) return res.status(400).json({ success: false, message: 'Mobile already registered' });
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }
  try {
    const { mobile, password } = req.body;
    const user = await User.findOne({ mobile }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid mobile or password' });
    }
    const token = generateToken(user._id);
    res.json({
      success: true, token,
      user: { id: user._id, fullName: user.fullName, mobile: user.mobile, village: user.village, state: user.state, language: user.language, trustScore: user.trustScore, earningsThisMonth: user.earningsThisMonth }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({
      success: true,
      user: { id: user._id, fullName: user.fullName, mobile: user.mobile, village: user.village, state: user.state, language: user.language, trustScore: user.trustScore, earningsThisMonth: user.earningsThisMonth, skills: user.skills, badges: user.badges }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateLanguage = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { language: req.body.language }, { new: true });
    res.json({ success: true, user: { id: user._id, language: user.language } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullName, village, state } = req.body;
    const updates = {};
    if (fullName) updates.fullName = fullName;
    if (village) updates.village = village;
    if (state) updates.state = state;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true });
    res.json({ success: true, user: { id: user._id, fullName: user.fullName, village: user.village, state: user.state } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
