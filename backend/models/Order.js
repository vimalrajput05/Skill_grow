const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  buyerName: {
    type: String,
    required: true
  },
  buyerLocation: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  advanceAmount: {
    type: Number,
    min: 0
  },
  advancePaid: {
    type: Boolean,
    default: false
  },
  deadline: {
    type: String,
    required: true
  },
  assignedGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  skillRequired: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'assigned', 'in-progress', 'completed', 'cancelled'],
    default: 'open'
  },
  milestones: [{
    description: {
      type: String,
      required: true
    },
    proofImage: String,
    approved: {
      type: Boolean,
      default: false
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);

