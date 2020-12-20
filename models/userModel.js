const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter a email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 8,
    select: false,
  },
  passwordChangedAt: Date,
});

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

adminSchema.methods.correctPassword = async function (
  userPassword,
  candidatePassword
) {
  console.log('lol', await bcrypt.compare(candidatePassword, userPassword));
  return await bcrypt.compare(userPassword, candidatePassword);
};

const Admin = new mongoose.model('Admin', adminSchema);
module.exports = Admin;
