const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/usersControllers');

// User registration route
router.post('/register', userControllers.register);

// User login route
router.post('/login', userControllers.login);

// User country and role route
router.post('/country',  userControllers.country);

// Admin-only routes for user management
router.put('/update-profile', userControllers.updateProfile);
router.get('/all-profiles', userControllers.getAllUsers);
router.delete('/delete-profile', userControllers.deleteProfile);

module.exports = router;
