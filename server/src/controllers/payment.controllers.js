
const generateCyberPayLink = async (userEmail, amount, formId) => {
  const paymentData = {
    amount, // Amount in the smallest currency unit (e.g., kobo for NGN)
    email: userEmail,
    reference: uuidv4(),
    callback_url: `${process.env.FRONTEND_URL}/payment/callback`, // Your callback URL
    metadata: {
      formId,
    },
  };

  const response = await axios.post('https://api.cyberpay.ng/api/v1/payments', paymentData, {
    headers: {
      'Authorization': `Bearer ${process.env.CYBERPAY_SECRET_KEY}`,
    },
  });

  return response.data.data.payment_url;
};

const sendPaymentLinkEmail = async (userEmail, paymentLink) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: userEmail,
    subject: 'Payment Link for Your Property Application',
    html: `
      <p>Hello,</p>
      <p>Your property application has been approved. Please click the following link to make a payment:</p>
      <p><a href="${paymentLink}">Pay Now</a></p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const initiatePayment = async (req, res) => {
    const { MerchantRef, Amount, Description, CustomerName, CustomerEmail, CustomerMobile, Splits } = req.body;
  
    const paymentData = {
      Currency: 'NGN',
      MerchantRef,
      Amount,
      Description,
      CustomerName,
      CustomerEmail,
      CustomerMobile,
      IntegrationKey: process.env.INTEGRATION_KEY,
      ReturnUrl: 'http://yourdomain.com/payment-success',
      WebhookUrl: 'http://yourdomain.com/webhook',
      Splits
    };
  
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://payment.cyberpay.ng/api/v1/payments',
      headers: { 'ApiKey': process.env.API_KEY },
      data: paymentData
    };
  
    try {
      const response = await axios(config);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    initiatePayment
}
  