import express from 'express'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import user from "./routes/user.js"
import product from "./routes/products.js"
import cart from "./routes/cart.js"
import payment from "./routes/payment.js"

dotenv.config();

const app = express()
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin : process.env.BASE_URL,
  // origin : "http://localhost:3000",
  credentials : true
}));


app.use("/", user);
app.use("/", product)
app.use("/", cart)
app.use("/", payment)

const Api_Key = (process.env.MONGODB_SERVER);
const PORT = process.env.PORT || 5000;


mongoose.connect(Api_Key)
    .then(()=> app.listen(PORT, ()=> console.log(`Server is running on port: ${PORT}`)))
    .catch((error) =>console.log(error.message));
