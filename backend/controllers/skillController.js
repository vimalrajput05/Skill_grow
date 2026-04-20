const Skill = require('../models/Skill');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.getSkills = async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = { isActive: true };
    if (category) query.category = category;
    if (search) query.$or = [{ name: { $regex: search, $options: 'i' } }];
    const skills = await Skill.find(query).sort({ demandCount: -1 }).lean();
    res.json({ success: true, skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id).lean();
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addMySkill = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }
  try {
    const { skillName, category, description } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const alreadyAdded = user.skills.some(s => s.skillName?.toLowerCase() === skillName?.toLowerCase());
    if (alreadyAdded) {
      return res.status(400).json({ success: false, message: 'Skill already added' });
    }

    const newSkill = { skillName, category, description: description || '', status: 'pending' };
    if (req.file) newSkill.proofImage = req.file.path;

    user.skills.push(newSkill);
    await user.save();

    res.status(201).json({ success: true, message: 'Skill added successfully', skill: newSkill, skills: user.skills });
  } catch (error) {
    console.error('addMySkill error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.requestSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    skill.demandCount = (skill.demandCount || 0) + 1;
    await skill.save();
    res.json({ success: true, message: 'Skill request sent', demandCount: skill.demandCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMySkills = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('skills');
    res.json({ success: true, skills: user.skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTopDemand = async (req, res) => {
  try {
    const skills = await Skill.find({ isActive: true }).sort({ demandCount: -1 }).limit(5).lean();
    res.json({ success: true, skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
