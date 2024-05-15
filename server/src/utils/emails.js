const nodemailer = require('nodemailer');

async function sendResetEmail(email, token) {
  const transporter = nodemailer.createTransport({
    // Configure your email transport options (e.g., SMTP, Mailgun, SendGrid)
  });

  const mailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: 'Password Reset',
    text: `To reset your password, click on the following link: http://localhost:3000/reset-password?token=${token}`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendResetEmail };