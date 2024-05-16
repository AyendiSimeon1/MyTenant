const nodemailer = require('nodemailer');
const { Oauth2Client } = require('google-auth-library');
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;


const sendResetEmail = async () => {
  const oauth = new Oauth2Client(clientId, clientSecret);
  oauth.setCredentials({ refresh_token: refreshToken });
  const accessToken = await oauth.getAccessToken();

  const transporter = nodemailer.createTransport({
    host: smtp.gmail.com,
    port: 465,
    secure: true,
    auth: {
      type: 'Oauth2',
      user: 'ayendisimeon3@gmail.com',
      clientId,
      clientSecret,
      refreshToken,
      accessToken
    },
  })

  const mailOptions = {
    from: 'konsizeinc@gmail.com',
    to: 'mrayendi1@gmail.com',
    subject: 'Password Reset',
    text: `To reset your password, click on the following link: http://localhost:3000/reset-password?token=${token}`,
  };

  const sentMail = await transporter.sendMail(mailOptions);
  return sentMail;
}

module.exports = { sendResetEmail };