const Trainer = require('../models/Trainer');

// @desc Get all trainers
// @route GET /api/trainers
exports.getTrainers = async (req, res) => {
  try {
    const { skill, state, availability, page = 1, limit = 12 } = req.query;
    const query = {};

    if (skill) {
      query.skills = skill;
    }
    if (state) {
      query.state = state;
    }
    if (availability) {
      query.availability = availability;
    }

    const trainers = await Trainer.find(query)
      .sort({ rating: -1, totalTrained: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Trainer.countDocuments(query);

    res.json({
      success: true,
      trainers,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single trainer
// @route GET /api/trainers/:id
exports.getTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id).lean();
    if (!trainer) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }
    res.json({ success: true, trainer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get available trainers
// @route GET /api/trainers/available
exports.getAvailableTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find({ availability: 'available' })
      .sort({ rating: -1 })
      .limit(20)
      .lean();
    
    res.json({ success: true, trainers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

