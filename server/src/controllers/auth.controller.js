const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const env = require('../config/env');

exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username }).select('+passwordHash');
  if (!admin) throw new ApiError(401, 'Invalid credentials');

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) throw new ApiError(401, 'Invalid credentials');

  admin.lastLogin = new Date();
  await admin.save();

  const token = jwt.sign(
    { id: admin._id, username: admin.username },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );

  ApiResponse(res, { token, username: admin.username }, 'Login successful');
});

exports.getMe = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id);
  if (!admin) throw new ApiError(404, 'Admin not found');
  ApiResponse(res, { username: admin.username, lastLogin: admin.lastLogin });
});
