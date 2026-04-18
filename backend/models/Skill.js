const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true
  },
  nameHi: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Farming', 'Technical', 'Home-Based', 'Digital', 'Business', 'AI', 'Safety', 'Other']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  descriptionHi: String,
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  estimatedEarning: {
    type: String,
    required: [true, 'Estimated earning is required']
  },
  demandCount: {
    type: Number,
    default: 0,
    min: 0
  },
  requestedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  autoSlotCreated: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Skill', skillSchema);

