import mongoose from 'mongoose';

const orderProduct = new mongoose.Schema({
    productDetails : {
        type: Array,
    },
    email: {
        type: String,
    },
    userId: {
        type: String,
    },
    paymentDetails: {
        paymentId : {
            type: String,
        },
        payment_method_type: [],
        payment_status: {
            type: String,
        }
    },
    shipping_options: [],
    total_amount: {
        type: Number,
    }

},{
    timestamps : true
})


export default mongoose.model("order", orderProduct);