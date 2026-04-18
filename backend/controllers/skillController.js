const Skill = require('../models/Skill');
const TrainingSlot = require('../models/TrainingSlot');
const Trainer = require('../models/Trainer');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @desc Get all skills
// @route GET /api/skills
exports.getSkills = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    const query = { isActive: true };

    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { nameHi: { $regex: search, $options: 'i' } }
      ];
    }

    const skills = await Skill.find(query)
      .sort({ demandCount: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Skill.countDocuments(query);

    res.json({
      success: true,
      skills,
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

// @desc Get single skill
// @route GET /api/skills/:id
exports.getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id).lean();
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.json({ success: true, skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Add user skill
// @route POST /api/skills/add-my-skill
exports.addMySkill = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { skillName, category, description, proofImage } = req.body;
    
    // Add skill to user
    const user = await User.findById(req.user.id);
    user.skills.push({
      skillName,
      category,
      description,
      proofImage,
      addedAt: new Date()
    });
    await user.save();

    // Update trustScore +5 for adding skill
    if (user.trustScore < 100) {
      user.trustScore = Math.min(100, user.trustScore + 5);
      await user.save();
    }

    res.status(201).json({
      success: true,
      message: 'Skill added successfully',
      skill: user.skills[user.skills.length - 1]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc User requests skill (increment demand)
// @route POST /api/skills/request/:id
exports.requestSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    // Check if user already requested
    const user = await User.findById(req.user.id);
    const alreadyRequested = skill.requestedBy.some(id => id.toString() === req.user.id);
    if (alreadyRequested) {
      return res.status(400).json({ success: false, message: 'Already requested this skill' });
    }

    skill.requestedBy.push(req.user.id);
    skill.demandCount += 1;
    await skill.save();

    // Business logic: if demand >=10 and no auto slot, create training slot
    if (skill.demandCount >= 10 && !skill.autoSlotCreated) {
      const trainer = await Trainer.findOne({ skills: skill.name }).sort({ rating: -1 }).limit(1);
      if (trainer) {
        const newSlot = new TrainingSlot({
          skill: skill._id,
          skillName: skill.name,
          trainer: trainer._id,
          trainerName: trainer.name,
          sessionDuration: skill.duration,
          fee: parseInt(skill.estimatedEarning) / 10,
          startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
          maxUsers: 20,
          minUsers: 10
        });
        await newSlot.save();
        skill.autoSlotCreated = true;
        await skill.save();
      }
    }

    res.json({
      success: true,
      message: 'Skill request sent successfully',
      demandCount: skill.demandCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get user's skills
// @route GET /api/skills/my-skills
exports.getMySkills = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('skills');
    res.json({
      success: true,
      skills: user.skills
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Top demand skills
// @route GET /api/skills/top-demand
exports.getTopDemand = async (req, res) => {
  try {
    const skills = await Skill.find({ isActive: true })
      .sort({ demandCount: -1 })
      .limit(5)
      .lean();
    res.json({ success: true, skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

