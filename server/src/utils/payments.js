const https = require('https');
require('dotenv').config;

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

          if (response.status) {
            await Application.findByIdAndUpdate(applicaionId, {
              $push: {
                payments: {
                  amount,
                  date: new Date(),
                  refrence: response.data.reference
                }
              }
            });
            res.status(200).json(response)
          }
        })
      }).on('error', error => {
        console.error(error)
      })
      
      req.write(params)
      req.end()
};

module.exports = { initiatePayment };