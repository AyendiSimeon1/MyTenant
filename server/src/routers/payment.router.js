const express = require('express');
const { initiatePayment } = require('../utils/payments');

const paymentRouter = express.Router();


paymentRouter.post('/initiate-payment', initiatePayment);

module.exports = { paymentRouter };