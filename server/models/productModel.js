import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    productName : String,
    model : String,
    brandName : String,
    category : String,
    productImage : [],
    description : String,
    regularPrice : Number,
    price : Number,
    availability: String

},{
    timestamps : true
})


export default mongoose.model("product",productSchema)
