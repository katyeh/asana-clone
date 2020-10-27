const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

// TODO: Add any functions that can be used in multiple modules

const hashPassword = async(password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

module.exports = { asyncHandler, hashPassword };
