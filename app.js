const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const adminRoute = require('./routers/adminRouter');
const globalErrorController = require('./controllers/errorController');
const viewRouter = require('./routers/viewRouter');
const clientRoute = require('./routers/clientRoute');
const AppError = require('./utils/appError');

const app = express();

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
  console.log('Developmnet');
}
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'sucess',
  });
});

app.use('/', viewRouter);
app.use('/api/client', clientRoute);
app.use('/api/admin', adminRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorController);
module.exports = app;
