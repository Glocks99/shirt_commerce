const mailer = require('nodemailer');

const transporter = mailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error verifying SMTP configuration:', error);
  } else {
    console.log('SMTP configuration is valid');
  }
});

module.exports = transporter;