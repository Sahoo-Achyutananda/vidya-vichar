const express = require('express');
const { registerUser, authUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/protect'); 

const router = express.Router();

// Public routes for authentication
router.post('/register', registerUser);
router.post('/login', authUser);

// Protected route (requires a valid JWT in the header)
// We chain the 'protect' middleware before the controller function
router.route('/profile').get(protect, getUserProfile);


module.exports = router;