const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  skillCategory: {
    type: String,
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  area: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  suggestedBusiness: {
    type: String,
    required: true
  },
  estimatedIncomeMin: {
    type: Number,
    required: true,
    min: 0
  },
  estimatedIncomeMax: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['forming', 'active', 'completed'],
    default: 'forming'
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Group', groupSchema);

