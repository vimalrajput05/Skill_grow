const TrainingSlot = require('../models/TrainingSlot');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @desc Get all slots
// @route GET /api/slots
exports.getSlots = async (req, res) => {
  try {
    const slots = await TrainingSlot.find({ status: { $in: ['open', 'active', 'starting-soon'] } })
      .populate('skill', 'name category')
      .populate('trainer', 'name avatarInitials')
      .populate('joinedUsers', 'fullName')
      .sort({ createdAt: -1 })
      .lean();
    
    res.json({ success: true, slots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single slot
// @route GET /api/slots/:id
exports.getSlot = async (req, res) => {
  try {
    const slot = await TrainingSlot.findById(req.params.id)
      .populate('skill', 'name category description')
      .populate('trainer', 'name specialty bio avatarInitials')
      .populate('joinedUsers', 'fullName mobile');
    
    if (!slot) {
      return res.status(404).json({ success: false, message: 'Slot not found' });
    }
    
    res.json({ success: true, slot });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Join slot
// @route POST /api/slots/join/:id
exports.joinSlot = async (req, res) => {
  try {
    const slot = await TrainingSlot.findById(req.params.id).populate('joinedUsers');
    
    if (!slot) {
      return res.status(404).json({ success: false, message: 'Slot not found' });
    }

    // Check if already joined
    const alreadyJoined = slot.joinedUsers.some(user => user._id.toString() === req.user.id);
    if (alreadyJoined) {
      return res.status(400).json({ success: false, message: 'Already joined this slot' });
    }

    // Check if full
    if (slot.status === 'full') {
      return res.status(400).json({ success: false, message: 'Slot is full' });
    }

    slot.joinedUsers.push(req.user.id);
    
    // Business logic: activate slot if min users reached
    if (slot.joinedUsers.length >= slot.minUsers && slot.status === 'open') {
      slot.status = 'active';
    }
    
    if (slot.joinedUsers.length >= slot.maxUsers) {
      slot.status = 'full';
    }
    
    await slot.save();

    // Update user trustScore +5 for joining
    const user = await User.findById(req.user.id);
    if (user.trustScore < 100) {
      user.trustScore = Math.min(100, user.trustScore + 5);
      await user.save();
    }

    res.json({
      success: true,
      message: `Joined slot! (${slot.joinedUsers.length}/${slot.maxUsers} users)`,
      status: slot.status,
      joinedUsersCount: slot.joinedUsers.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get user's slots
// @route GET /api/slots/my-slots
exports.getMySlots = async (req, res) => {
  try {
    const slots = await TrainingSlot.find({ 
      joinedUsers: req.user.id,
      status: { $in: ['open', 'active', 'starting-soon', 'completed'] }
    })
      .populate('skill', 'name')
      .populate('trainer', 'name')
      .sort({ startDate: 1 });
    
    res.json({ success: true, slots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

