const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const mailer = async (email, token) => {
  const info = await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "OTP verification", 

    html: `
        <h1> <b>Your OTP code is ${token} </b></h1>
        `,
  });
  return info.messageId;
};
module.exports = { mailer };
