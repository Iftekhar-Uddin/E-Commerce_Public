import express from 'express'
const router = express.Router();
import {addToCart, addCartView, addCartCounts} from "../controller/cart/view_count.js";
import {updateCart, daleteCart} from "../controller/cart/update_delete.js"
import verify from '../middleware/verify.js'

// Cart
router.post('/addtocart', verify, addToCart)
router.get('/addcartview', verify, addCartView)
router.get('/addcartcounts', verify, addCartCounts)

// Cart Manipulation
router.post('/updatecart', verify, updateCart)
router.delete('/daletecart', verify, daleteCart)


export default router