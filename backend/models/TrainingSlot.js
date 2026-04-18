const mongoose = require('mongoose');

const trainingSlotSchema = new mongoose.Schema({
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true
  },
  skillName: {
    type: String,
    required: true
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: true
  },
  trainerName: {
    type: String,
    required: true
  },
  sessionDuration: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true,
    min: 0
  },
  maxUsers: {
    type: Number,
    default: 20,
    min: 1
  },
  minUsers: {
    type: Number,
    default: 10,
    min: 1
  },
  joinedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['open', 'full', 'active', 'starting-soon', 'completed', 'cancelled'],
    default: 'open'
  },
  startDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TrainingSlot', trainingSlotSchema);

