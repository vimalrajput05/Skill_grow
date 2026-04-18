const express = require('express');
const { body } = require('express-validator');
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', jobController.getJobs);

router.use(authMiddleware);

router.post('/post', [
  body('name').trim().notEmpty().withMessage('Job name required'),
  body('skillRequired').trim().notEmpty().withMessage('Skill required'),
  body('location').trim().notEmpty().withMessage('Location required'),
  body('payRange').trim().notEmpty().withMessage('Pay range required'),
  body('contact').trim().notEmpty().withMessage('Contact required')
], jobController.postJob);

router.get('/my-posts', jobController.getMyJobs);
router.delete('/:id', jobController.deleteJob);

module.exports = router;

