const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);

// Handle payment creation
const initiatePayment = async (req, res) => {
  const { amount, email, reference } = req.body;

  try {
    const payment = await paystack.initializeTransaction({
      amount: amount * 100, // Paystack requires amount in kobo
      email,
      reference,
      callback_url: 'https://yourwebsite.com/payment/callback', // Redirect URL after payment
    });
    
    res.json(payment);
  } catch (error) {
    console.error('Payment initiation failed:', error);
    res.status(500).json({ message: 'Payment initiation failed' });
  }
};

// Handle payment verification
const verifyPayment = async (req, res) => {
  const { reference } = req.query;

  try {
    const transaction = await paystack.verifyTransaction({ reference });
    
    if (transaction.status === 'success') {
      // Payment successful, update database or trigger next steps
      res.json({ message: 'Payment successful', transaction });
    } else {
      res.status(400).json({ message: 'Payment not successful', transaction });
    }
  } catch (error) {
    console.error('Payment verification failed:', error);
    res.status(500).json({ message: 'Payment verification failed' });
  }
};

module.exports = {
  initiatePayment,
  verifyPayment,
};
