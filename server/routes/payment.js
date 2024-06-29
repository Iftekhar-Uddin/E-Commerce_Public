import express from 'express'
const router = express.Router();
import verify from "../middleware/verify.js";
import {payment, webhooks} from "../controller/payment/payment.js";
import {order} from "../controller/payment/order.js";


router.post('/payment', verify, payment);
router.post('/webhook', webhooks);
router.get('/order',verify, order);

export default router;