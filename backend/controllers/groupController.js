const Group = require('../models/Group');
const User = require('../models/User');

// @desc Get all groups
// @route GET /api/groups
exports.getGroups = async (req, res) => {
  try {
    const { skillCategory, state, area, page = 1, limit = 10 } = req.query;
    const query = {};

    if (skillCategory) query.skillCategory = skillCategory;
    if (state) query.state = state;
    if (area) query.area = { $regex: area, $options: 'i' };

    const groups = await Group.find(query)
      .populate('members', 'fullName village trustScore')
      .populate('leader', 'fullName village')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Group.countDocuments(query);

    res.json({
      success: true,
      groups,
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

// @desc Get group suggestions for user
// @route GET /api/groups/suggestions
exports.getGroupSuggestions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('skills state village');
    
    // Find potential members in same state with similar skills
    const potentialMembers = await User.find({
      state: user.state,
      'skills.status': 'verified',
      'skills.0': { $exists: true }
    }).limit(20);

    // Group by skill category
    const suggestions = [];
    const categoryMap = {};

    potentialMembers.forEach(member => {
      member.skills.forEach(skill => {
        if (skill.status === 'verified') {
          const cat = skill.category;
          if (!categoryMap[cat]) categoryMap[cat] = [];
          categoryMap[cat].push(member._id);
        }
      });
    });

    // Create suggestion objects
    Object.keys(categoryMap).forEach(cat => {
      if (categoryMap[cat].length >= 3) { // min 3 potential members
        suggestions.push({
          skillCategory: cat,
          potentialMemberCount: categoryMap[cat].length,
          state: user.state,
          area: user.village,
          suggestedBusiness: `${cat} production group`,
          estimatedIncomeMin: 5000,
          estimatedIncomeMax: 25000,
          status: 'forming'
        });
      }
    });

    res.json({
      success: true,
      suggestions: suggestions.slice(0, 6)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Join group
// @route POST /api/groups/join/:id
exports.joinGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    // Check if already member
    const alreadyMember = group.members.some(id => id.toString() === req.user.id);
    if (alreadyMember) {
      return res.status(400).json({ success: false, message: 'Already a member' });
    }

    group.members.push(req.user.id);
    
    // If first 3 members, set leader (highest trustScore)
    if (group.members.length === 3 && !group.leader) {
      const members = await User.find({ _id: { $in: group.members } }).sort({ trustScore: -1 });
      group.leader = members[0]._id;
    }

    await group.save();

    // Trust score +5 for joining group
    const user = await User.findById(req.user.id);
    if (user.trustScore < 100) {
      user.trustScore = Math.min(100, user.trustScore + 5);
      await user.save();
    }

    res.json({
      success: true,
      message: 'Joined group successfully',
      memberCount: group.members.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

