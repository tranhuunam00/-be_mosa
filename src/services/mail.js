const nodemailer = require('nodemailer');
require('dotenv').config();
const logger = require('../utils/logger');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tranhuunam23022000@gmail.com', //Tài khoản gmail
    pass: 'psjtpkecqmwptiqv', //Mật khẩu gmail
  },
  tls: {
    rejectUnauthorized: false,
  },
});

let contentHTML = '';
contentHTML += `
  <div style="padding: 10px; background-color: #003375">
      <div style="padding: 10px; background-color: white;">
        <h4 style="color: #0085ff">Auto-Buddy</h4>
        <span style="color: black">Đây là mật khẩu cho tài khoản admin auto-buddy </span>
      </div>
  </div>
`;

const mailOptions = (email, label, content, template) => {
  return {
    from: process.env.MAIL_NAME,
    to: email,
    subject: label,
    text: content,
    html: template,
  };
};

const sendMail = async (mailOption) => {
  logger.debug(`SendMail: Sending...`);
  const isSendOK = await new Promise((resolve, reject) => {
    transporter.sendMail(mailOption, function (err, info) {
      if (err) {
        return reject(err);
      } else {
        return resolve(true);
      }
    });
  });
  return isSendOK;
};

module.exports = {
  sendMail,
  mailOptions,
};
