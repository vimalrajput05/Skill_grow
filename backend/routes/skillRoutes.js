const express = require('express');
const { body } = require('express-validator');
const skillController = require('../controllers/skillController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

// Public routes
router.get('/', skillController.getSkills);
router.get('/:id', skillController.getSkill);
router.get('/top-demand', skillController.getTopDemand);

// Protected routes
router.use(authMiddleware);

router.post('/add-my-skill', [
  body('skillName').trim().notEmpty().withMessage('Skill name required'),
  body('category').isIn(['Farming', 'Technical', 'Home-Based', 'Digital', 'Business', 'AI', 'Safety', 'Other']).withMessage('Invalid category'),
  body('description').trim().notEmpty().withMessage('Description required')
], uploadMiddleware.single('proofImage'), skillController.addMySkill);

router.post('/request/:id', skillController.requestSkill);
router.get('/my-skills', skillController.getMySkills);

module.exports = router;

