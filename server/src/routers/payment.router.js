import { initiatePayment } from '../utils/payments';
const express = require('express');


const paymentRouter = express.Router();

paymentRouter.post('/initiate-payment', initiatePayment);