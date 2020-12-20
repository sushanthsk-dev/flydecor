const Client = require('../models/clientModel');
const APIFeatures = require('../utils/ApiFeatures');
const CatchAsync = require('../utils/catchAsync');
exports.getOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'Hello',
  });
};

exports.adminLogin = (req, res) => {
  res.status(200).render('admincontrol', {
    title: 'Hello',
  });
};

exports.responseData = CatchAsync(async (req, res) => {
  const features = new APIFeatures(Client.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const response = await features.query;
  res.status(200).render('response', {
    title: 'Response',
    response,
  });
});

exports.responseForm = CatchAsync(async (req, res, next) => {
  const response = await Client.find();
  res.status(200).render('response', {
    title: 'Response',
    response,
  });
});
