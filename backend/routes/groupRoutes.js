const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/protect');
const { createGroup, joinGroup, userGroups, getQuestion, postQuestion, updateQuestion, deleteQuestion } = require('../controllers/groupController');


router.post('/create',  createGroup);
router.post('/join', joinGroup);
router.get('/', userGroups);

router.get('/:groupid/questions', getQuestion);
router.post('/:groupid/questions', postQuestion);
router.put('/:groupid/questions/:questionid', updateQuestion);
router.delete('/:groupid/questions/:questionid', deleteQuestion);

module.exports = router;