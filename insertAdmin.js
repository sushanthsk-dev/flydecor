const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('DB connection successful');
  });;

const email = 'flydecor@gmail.com';
const password = 'Biriyani318@';

const name = 'Fly Decor';
const body = {name, email, password };
console.log(body);

const Insert = async () => {
  try {
      console.log("INser");
    await Admin.create(emai);
    console.log("Done");
    process.exit();
  } catch (e) {
    console.log(e);
  }
  process.exit();
};

if(process.argv[2] =='--insert') {
    console.log("Insert");
Insert();
process.exit();
}
