const express = require('express');
const { body } = require('express-validator');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/open', orderController.getOpenOrders);

router.use(authMiddleware);

router.post('/apply/:id', orderController.applyForOrder);
router.put('/milestone/:id', [
  body('description').trim().notEmpty().withMessage('Description required')
], uploadMiddleware.single('proofImage'), orderController.uploadMilestone);

module.exports = router;

