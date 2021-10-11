const nodemailer = require('nodemailer');
const catchAsync = require('./../utils/catchAsync');

const sendEmail = async ({ email, subject, message }) => {
  // 1) Create a transporter
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // Activate in gmail "less secure app" option

  // 2) Define the email options
  const mailOptions = {
    from: 'Saswat Samal <ssaswat786@gmail.com>',
    to: email,
    subject: subject,
    text: message,
  };

  // 3) Actually send the email
  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;
