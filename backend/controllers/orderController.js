const Order = require('../models/Order');

// @desc Get open orders
// @route GET /api/orders/open
exports.getOpenOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'open' })
      .populate('assignedGroup', 'skillCategory members')
      .sort({ createdAt: -1 })
      .lean();
    
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Apply for order
// @route POST /api/orders/apply/:id
exports.applyForOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order || order.status !== 'open') {
      return res.status(400).json({ success: false, message: 'Order not available' });
    }

    // Check if group applied (simplified - in production check group)
    if (order.assignedGroup) {
      return res.status(400).json({ success: false, message: 'Order already assigned' });
    }

    // Assign to first group or logic here
    order.status = 'assigned';
    await order.save();

    res.json({
      success: true,
      message: 'Applied for order successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Upload milestone proof
// @route PUT /api/orders/milestone/:id
exports.uploadMilestone = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const { description } = req.body;
    const proofImage = req.file ? `/uploads/${req.file.filename}` : null;

    order.milestones.push({
      description,
      proofImage,
      approved: false
    });

    await order.save();

    res.json({
      success: true,
      message: 'Milestone uploaded successfully',
      milestone: order.milestones[order.milestones.length - 1]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

