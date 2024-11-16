const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '2h' });
};

// User registration
const register = async (req, res) => {
    const { email, password, role, country } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            password: hashedPassword,
            role,
            country
        });

        const accessToken = createAccessToken({ email, role, country });

        res.cookie('accessToken', accessToken, {  maxAge: 2 * 60 * 60 * 1000 });
        res.cookie('role', role, {  maxAge: 2 * 60 * 60 * 1000 });
        res.cookie('country', country, {  maxAge: 2 * 60 * 60 * 1000 });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'User already exists or server error' });
    }
};

// User login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User does not exist' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ error: 'Incorrect password' });

        const accessToken = createAccessToken({ email: user.email, role: user.role, country: user.country });

        res.cookie('accessToken', accessToken, {  maxAge: 2 * 60 * 60 * 1000 });
        res.cookie('role', user.role, {  maxAge: 2 * 60 * 60 * 1000 });
        res.cookie('country', user.country, {  maxAge: 2 * 60 * 60 * 1000 });
        res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get user country and role
const country = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ email: req.cookies?.email }, {country:req.body.country}).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ role: user.role, country: user.country });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update user profile (admin only)
const updateProfile = async (req, res) => {
    const { email, role, country } = req.body;
    
    if (!email || !role || !country) {
        return res.status(400).json({ error: 'Please provide email, role, and country' });
    }

    try {
        const user = await User.findOneAndUpdate(
            { email },
            { role, country },
            { new: true } 
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { password, ...userWithoutPassword } = user.toObject();
        res.status(200).json({
            message: 'User profile updated successfully',
            user: userWithoutPassword,
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Failed to update user profile' });
    }
};


// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
};

const deleteProfile = async (req, res) => {
    const email = req.body.email;
    try {
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        const user = await User.deleteOne({ email });
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
}

module.exports = {
    register,
    login,
    country,
    updateProfile,
    getAllUsers,
    deleteProfile
};
