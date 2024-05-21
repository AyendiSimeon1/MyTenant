// const express = require('express');
// const router = express.Router();
// const paystack = require('../utils/paystack');

// // Route to initialize a Paystack transaction
// router.post('/initialize', async (req, res) => {
//   try {
//     const { amount, email, plan = 'default' } = req.body; // Extract payment details

//     // Calculate agent and admin shares based on your split logic
//     const agentShare = amount * 0.6; // Adjust this percentage as needed
//     const adminShare = amount - agentShare;

//     const body = {
//       email,
//       amount: Math.round(agentShare * 100), // Convert to kobo for Paystack
//       plan, // Optional plan for recurring payments
//       metadata: {
//         // Optional metadata to store additional information
//         tenantId: req.body.tenantId, // Example: Store tenant ID for reference
//       },
//     };

//     const response = await paystack.initializeTransaction(body);

//     if (response.status) {
//       res.status(200).json({
//         data: response.data,
//         message: response.message,
//         status: response.status,
//       });
//     } else {
//       res.status(response.status).json({
//         error: response.message,
//       });
//     }
//   } catch (error) {
//     console.error('Error initializing payment:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// const Paystack = require('paystack')('your_test_secret_key'); // Replace with your secret key

// exports.initializeTransaction = async (body) => {
//   return new Promise((resolve, reject) => {
//     Paystack.transactions.initialize(body, (error, response) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(response);
//       }
//     });
//   });
// };

// // ... (Optional: Add verifyTransaction function if needed)


// module.exports = router;
