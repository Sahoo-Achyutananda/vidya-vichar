const express = require('express');
const router = express.Router();
const { createGroup, joinGroup, userGroups, getQuestion, postQuestion, updateQuestion, deleteQuestion } = require('../controllers/groupController');
const verifyUser = require('../middleware/authMiddleware');

router.post('/create', verifyUser, createGroup);
router.post('/join', verifyUser, joinGroup);
router.get('/', verifyUser, userGroups);

router.get('/:groupid', verifyUser, getQuestion);
router.post('/:groupid', verifyUser, postQuestion);
router.put('/:groupid/questions/:questionid', verifyUser, updateQuestion);
router.delete('/:groupid/questions/:questionid', verifyUser, deleteQuestion);

module.exports = router;