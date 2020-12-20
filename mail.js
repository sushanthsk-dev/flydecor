const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mailTransporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USERNAME,
    pass: process.env.SENDGRID_PASSWORD,
  },
});

//    service:'SendGrid',
//     auth:{
//         user:process.env.SENDGRID_USERNAME,
//         pass:process.env.SENDGRID_PASSWORD,
//     }

const sendMailer = async () => {
  const mailOptions = {
    from: `<${process.env.EMAIL_FROM}>`,
    to: `prajithgowda23@gmail.com`,
    subject: 'Hello Laude',
    text: 'Laude 🤣🤣🤣🤣',
  };
  try {
    await mailTransporter.sendMail(mailOptions);
    console.log('Sent', process.env.EMAIL_FROM);
  } catch (e) {
    console.log(e);
  }
};

for (let i = 0; i < 1000; i++) {
  setTimeout(() => {
    sendMailer();
  }, 1000);

  console.log(`Sent ${i}`);
}
