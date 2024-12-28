const express = require('express');
const router = express.Router();
const User = require('../models/userModel');  // Import the User model
const bcrypt = require('bcryptjs'); // For password comparison
const jwt = require('jsonwebtoken');  // For generating JWT tokens

// Signup route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create a new user
      const newUser = new User({ email, password });
      
      // Log before saving to verify
      console.log('Before Saving: ', newUser);
  
      // Save the new user (password will be hashed here)
      await newUser.save();
  
      console.log('User Saved: ', newUser);  // Check if user is saved correctly
  
      // Respond with success message
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error('Error during signup:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Log to check the user fetched
      console.log('User Found: ', user);
  
      // Compare the password with the hashed password stored in the database
      const isMatch = await user.comparePassword(password);
      
      // Log result of password comparison
      console.log('Passwords Match: ', isMatch);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Create JWT token if credentials are valid
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
  
      // Respond with the token
      res.cookie('token', token, { httpOnly: true, secure: false });
      res.status(200).json({ message: 'Logged in successfully' });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  //logout route
  router.post('/logout', (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token', { httpOnly: true, secure: false });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        console.error('Error during logout:', err);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;
