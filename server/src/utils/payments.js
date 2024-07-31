const https = require('https');
require('dotenv').config;

const paystack_secret_key = process.env.PAYSTACK_SECRET_KEY;
const initiatePayment = () => {
    const params = JSON.stringify({
        "email": "ayendisimeon3@gmail.com",
        "amount": "20000",
        "subaccount": "ACCT_x81g7u5z0fkkbyn"
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
      
        res.on('end', () => {
          console.log(JSON.parse(data))
        })
      }).on('error', error => {
        console.error(error)
      })
      
      req.write(params)
      req.end()
};

module.exports = { initiatePayment };