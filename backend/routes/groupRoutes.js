const express = require('express');
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', groupController.getGroups);

router.use(authMiddleware);

router.get('/suggestions', groupController.getGroupSuggestions);
router.post('/join/:id', groupController.joinGroup);

module.exports = router;

