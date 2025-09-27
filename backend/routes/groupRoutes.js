const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/protect'); // Import protect
const { createGroup, joinGroup, userGroups, getQuestion, postQuestion, updateQuestion, deleteQuestion } = require('../controllers/groupController');

// All group routes require authentication
router.post('/create', protect, createGroup);
router.post('/join', protect, joinGroup);
router.get('/', protect, userGroups); // Get groups the user belongs to

// Question routes require authentication
router.get('/:groupid/questions', protect, getQuestion);
router.post('/:groupid/questions', protect, postQuestion);
router.put('/:groupid/questions/:questionid', protect, updateQuestion);
router.delete('/:groupid/questions/:questionid', protect, deleteQuestion);

module.exports = router;