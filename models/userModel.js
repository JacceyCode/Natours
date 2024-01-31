const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please input your name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email.'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE...
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords does not match!',
    },
  },
});

// Middleware for password encryption or Hashing
userSchema.pre('save', async function (next) {
  // This helps to only run the function if password was modified
  if (!this.isModified('password')) return next();

  // Hash or encrypt the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
