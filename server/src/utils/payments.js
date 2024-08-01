const https = require('https');
require('dotenv').config;
const path = require('path');
const { getReceiptData, generateReceipt } = require('./receiptUtils');

const paystack_secret_key = process.env.PAYSTACK_SECRET_KEY;
const initiatePayment = () => {
  const { email, amount, subaccount, applicationId } = req.body;
    const params = JSON.stringify({
        email: email,
        amount: amount * 100,
        subaccount: subaccount
    });
    
    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: `Bearer sk_test_d302885900cb8234664c32e14531f5e0a11c363e`,
            'Content-type': 'application/json'
        }
    }
    
    const req = https.request(options, res => {
        let data = ''
      
        res.on('data', (chunk) => {
          data += chunk
        });
      
        res.on('end', async () => {
          console.log(JSON.parse(data));

          if (paystackResponse.status) {
            // Store the payment reference in the application
            const updatedApplication = await Application.findByIdAndUpdate(applicationId, {
              $push: {
                payments: {
                  amount,
                  date: new Date(),
                  reference: paystackResponse.data.reference
                }
              }
            }, { new: true }).populate('userId').populate('propertyId');
    
            // Get the latest payment information
            const paymentData = await getReceiptData(applicationId);
    
            // Generate the receipt PDF
            const receiptPath = path.join(__dirname, `../receipts/receipt_${applicationId}.pdf`);
            generateReceipt(paymentData, receiptPath);
    
            res.status(200).json({ message: 'Payment successful and receipt generated', receiptPath });
          } else {
            res.status(400).json(paystackResponse);
          }
        })
      }).on('error', error => {
        console.error(error)
      })
      
      req.write(params)
      req.end()
};

module.exports = { initiatePayment };