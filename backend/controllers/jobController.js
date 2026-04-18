const Job = require('../models/Job');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @desc Get all jobs
// @route GET /api/jobs
exports.getJobs = async (req, res) => {
  try {
    const { skill, location, type, page = 1, limit = 15 } = req.query;
    const query = { status: 'open' };

    if (skill) query.skillRequired = { $regex: skill, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (type) query.type = type;

    const jobs = await Job.find(query)
      .populate('postedBy', 'fullName village state trustScore')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Job.countDocuments(query);

    res.json({
      success: true,
      jobs,
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

// @desc Post job
// @route POST /api/jobs/post
exports.postJob = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const job = new Job({
      ...req.body,
      postedBy: req.user.id
    });
    await job.save();

    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      job
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get user's jobs
// @route GET /api/jobs/my-posts
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id })
      .sort({ createdAt: -1 })
      .lean();
    
    res.json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete job
// @route DELETE /api/jobs/:id
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, postedBy: req.user.id });
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found or not authorized' });
    }

    await Job.findByIdAndDelete(req.params.id);
    
    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

