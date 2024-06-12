import { initiatePayment } from '../controllers/payment.controllers';
const express = require('express');


const paymentRouter = express.Router();

paymentRouter.post('/initiate-payment', initiatePayment);