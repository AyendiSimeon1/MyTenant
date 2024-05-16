const twilio = require('twilio');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const sendResetSms = async (toPhoneNumber, token) => {
  try {
    const message = await client.messages.create({
      body: `To reset your password, click on the following link: http://localhost:3000/reset-password?token=${token}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: toPhoneNumber,
    });
    console.log('SMS sent:', message.sid);
    return message;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};

module.exports = { sendResetSms };
