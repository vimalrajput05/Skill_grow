const express = require('express');
const { body } = require('express-validator');
const skillController = require('../controllers/skillController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

// Public
router.get('/', skillController.getSkills);
router.get('/top-demand', skillController.getTopDemand); // must be BEFORE /:id

// Protected
router.use(authMiddleware);
router.get('/my-skills', skillController.getMySkills);   // must be BEFORE /:id

router.get('/:id', skillController.getSkill);

router.post('/add-my-skill', [
  body('skillName').trim().notEmpty().withMessage('Skill name required'),
  body('category').isIn(['Farming', 'Carpentry', 'Sewing', 'Technical', 'Home-Based', 'Digital', 'Business', 'AI', 'Safety', 'Other']).withMessage('Invalid category'),
], uploadMiddleware.single('proofImage'), skillController.addMySkill);

router.post('/request/:id', skillController.requestSkill);

module.exports = router;
