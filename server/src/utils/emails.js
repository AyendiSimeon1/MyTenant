
const twilio = require('twilio');
const dotenv = require('dotenv').config();
                        
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const sendResetSms = async (phoneNumber, token) => {
  try {
    const message = await client.messages.create({
      body: `To reset your password, click on the following link: http://localhost:3000/reset-password?token=${token}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    console.log('SMS sent to user:', message.sid);
    return message;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};

module.exports = { sendResetSms };
