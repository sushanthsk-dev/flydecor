const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const adminRoute = require('./routers/adminRouter');
const globalErrorController = require('./controllers/errorController');
const viewRouter = require('./routers/viewRouter');
const clientRoute = require('./routers/clientRoute');
const AppError = require('./utils/appError');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
app.enable('trust proxy');
app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.options('*', cors());
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  console.log('Developmnet');
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP,Please try again...',
});

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(compression());
app.use('/api', limiter);
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
