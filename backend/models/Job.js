const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Job name is required'],
    trim: true
  },
  skillRequired: {
    type: String,
    required: [true, 'Required skill is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  payRange: {
    type: String,
    required: [true, 'Pay range is required']
  },
  contact: {
    type: String,
    required: [true, 'Contact info is required']
  },
  type: {
    type: String,
    enum: ['local', 'urban', 'online'],
    default: 'local'
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);

