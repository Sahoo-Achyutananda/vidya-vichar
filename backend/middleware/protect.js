const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel'); // Adjust path if needed

/**
 * Protects routes by checking for a valid JWT in the request header.
 * If valid, it attaches the user to the request (req.user) and calls next().
 */
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Check for token in the 'Authorization' header
    // The token is expected to be in the format: 'Bearer <token>'
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header (split 'Bearer' from the token string)
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify token using your JWT_SECRET from .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Get user from the token payload (it contains the user ID)
            // We use .select('-password') to exclude the password hash from the result
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                // Token is valid but the user ID in the token doesn't match a user in the DB
                res.status(401);
                throw new Error('Not authorized, user not found');
            }

            // 4. Continue to the next middleware or route handler
            next();

        } catch (error) {
            console.error(error);
            // If verification fails (e.g., token expired, wrong secret)
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    // If no token is provided in the header
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };