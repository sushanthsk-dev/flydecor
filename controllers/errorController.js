const AppError = require('../utils/appError');

const sendDevError = (err, req, res) => {
  res.status(404).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    console.log('Laude');
    return res.status(500).json({
      status: 'Error',
      message: 'Something went very wrong',
    });
  }
  // 2) Rendered Webstie
  if (err.isOperational) {
    res.status(404).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    });
  }
};
module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV == 'development') {
    sendDevError(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = err;
    sendErrorProd(error, req, res);
  }
};
