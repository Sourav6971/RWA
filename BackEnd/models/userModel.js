const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password before saving it to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    // Hash the password
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  

// Method to compare password during login
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compare plain-text password with hashed password
};

// Create and export the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
