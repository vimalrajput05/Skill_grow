const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialty: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  bio: String,
  bioHi: String,
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalTrained: {
    type: Number,
    default: 0
  },
  availability: {
    type: String,
    enum: ['available', 'busy', 'online-only', 'next-week'],
    default: 'available'
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  sessionTypes: [String],
  skills: [String],
  avatarInitials: {
    type: String,
    maxlength: 4
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Trainer', trainerSchema);

