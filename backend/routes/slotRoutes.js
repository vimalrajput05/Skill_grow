const express = require('express');
const slotController = require('../controllers/slotController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', slotController.getSlots);
router.get('/:id', slotController.getSlot);

router.use(authMiddleware);

router.post('/join/:id', slotController.joinSlot);
router.get('/my-slots', slotController.getMySlots);

module.exports = router;

