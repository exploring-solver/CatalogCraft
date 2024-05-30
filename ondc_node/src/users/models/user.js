const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../../config');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  number: {
    type: String,
    required: true,
    maxlength: 10
  },
  role: {
    type: String,
    enum: ['ADMIN', 'SELLER'],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  },
  last_login: {
    type: Date
  },
  date_joined: {
    type: Date,
    default: Date.now
  }
});

// Password hashing
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// JWT generation
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, config.API_KEY_JWT, { expiresIn: config.TOKEN_EXPIRES_IN });
  return token;
};

// Custom user creation methods
userSchema.statics.createUser = async function (email, password, name, number, role) {
  if (!email || !password || !name || !number) {
    throw new Error('Required fields are missing');
  }

  const user = new this({ email, password, name, number, role });
  await user.save();
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
