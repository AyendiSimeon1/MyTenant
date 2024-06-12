
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
  