const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception! SHUTTING DOWN');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected successfully');
  });
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! SHUTTING DOWN');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', (err) => {
  console.log('SIGTERM Received, SHUTTING DOWN gracefully');
  server.close(() => {
    console.log('Process Terminated....');
  });
});
