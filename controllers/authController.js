const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const CatchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET_CODE, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_EXPIRE_IN * 24 * 60 * 60),
    httpOnly: true,
  };
  // if (process.env.NODE_ENV == 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: user,
    },
  });
};
exports.login = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 401));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  createSendToken(user, 201, req, res);
});

// exports.signup = CatchAsync(async (req, res, next) => {
//   console.log(req.body);
//   await User.create(req.body);
//   res.status(200).json({
//     status: 'Sucess',
//   });
// });

exports.protect = CatchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  console.log(token);
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }
  try {
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_CODE
    );
    const currentUser = await User.findById(decoded.id);
    if (!currentUser)
      return next(
        new AppError('The user belonging to this token does no longer exist')
      );
    req.user = currentUser;
  } catch (e) {
    return next();
  }
  next();
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'logout', {
    expires: new Date(new Date() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};
