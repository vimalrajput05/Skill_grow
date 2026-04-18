const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/auth/register
router.post('/register', [
  body('fullName').trim().notEmpty().withMessage('Full name required'),
  body('mobile').isLength({ min: 10, max: 10 }).withMessage('Mobile must be 10 digits'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
  body('village').trim().notEmpty().withMessage('Village required'),
  body('state').trim().notEmpty().withMessage('State required')
], authController.register);

// POST /api/auth/login
router.post('/login', [
  body('mobile').isLength({ min: 10, max: 10 }).withMessage('Mobile must be 10 digits'),
  body('password').notEmpty().withMessage('Password required')
], authController.login);

// Protected routes
router.use(authMiddleware);

// GET /api/auth/me
router.get('/me', authController.getMe);

// PUT /api/auth/update-language
router.put('/update-language', [
  body('language').isIn(['en', 'hi']).withMessage('Invalid language')
], authController.updateLanguage);

// PUT /api/auth/update-profile
router.put('/update-profile', [
  body('fullName').optional().trim().notEmpty().withMessage('Full name required'),
  body('village').optional().trim().notEmpty().withMessage('Village required'),
  body('state').optional().trim().notEmpty().withMessage('State required')
], authController.updateProfile);

module.exports = router;

