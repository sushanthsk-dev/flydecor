const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const express = require('express');
const Router = express.Router();
Router.get('/', viewController.getOverview);
Router.get('/admin', viewController.adminLogin);
// Router.use();
Router.get('/response', authController.protect, viewController.responseData);

module.exports = Router;
