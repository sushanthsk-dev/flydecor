const Client = require('../models/clientModel');
const AppError = require('../utils/appError');
const CatchAsync = require('../utils/catchAsync');

exports.contactForm = CatchAsync(async (req, res, next) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return next(new AppError('Please fill the form', 401));
  }

  await Client.create(req.body);
  res.status(200).json({
    status: 'success',
  });
});
