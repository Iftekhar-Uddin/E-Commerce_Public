import usermodel from "../../models/userModel.js"
import stripe from "../../models/stripe.js"
import orderModel from "../../models/orderModel.js";
import cartModel from "../../models/cartModel.js"


export const payment = async (req, res) => {
    try {
        const user = await usermodel.findOne({_id: req.userId})
        const {cartItems} = req.body;

        const params = {
            submit_type : "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: 'auto',
            shipping_options : [{
                shipping_rate : "shr_1PPj6ULUYFz6Oorg51Q05WQ7"
            }],
            customer_email: user.email,
            metadata:{
                userId: req.userId
            },
            line_items: cartItems?.map((item, ind)=>{
                return {
                    price_data: {
                        currency : "BDT",
                        product_data: {
                            name: item.productId.productName,
                            images: item.productId.productImage,
                            metadata: {
                                productId : item.productId._id
                            }
                        },
                        unit_amount: item.productId.price * 100
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    quantity: item.quantity
                }
            }),
            success_url : 'https://e-commerce-client-gtx6.onrender.com/success',
            cancel_url : 'https://e-commerce-client-gtx6.onrender.com/cancel',
        };

        const session = await stripe.checkout.sessions.create(params)
        res.status(303).json(session)
        
    } catch (error) {
        res.json({
            message: error?.message || error,
            error: true,
            success: false
        })
    }
};


async function getlineItems(lineItems){
    let productItems = [];
    if(lineItems?.data?.length){
        for(const element of lineItems?.data){
            const product = await stripe.products.retrieve(element.price.product)
            const productId = product.metadata.productId
            console.log(product)

            const productData = {
                productId : productId,
                name : product.name,
                price: element.price.unit_amount/100,
                quantity: element.quantity,
                image: product.images[0]
            }
            productItems.push(productData);
        }
    }
    return productItems
};



export const webhooks = async (request, response)=> {
    const sig = request.headers['stripe-signature'];
    const payloadString = JSON.stringify(request.body);
    const endpointSecret = process.env.ENDPOINT_SECRET
  
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });
  
    let event;
    try {
      event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    };

    switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object;

          const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
          const productDetails = await getlineItems(lineItems);

            const orderDetails = {
                productDetails: productDetails,
                email: session.customer_email,
                userId: session.metadata.userId,
                paymentDetails: {
                    paymentId : session.payment_intent,
                    payment_method_type: session.payment_method_types,
                    payment_status: session.payment_status
                },
                shipping_options: session.shipping_options.map(opt => {
                    return {
                        ...opt, shipping_amount: (opt.shipping_amount/100)
                    }
                }),
                total_amount: session.amount_total/100,
            };

            console.log(orderDetails)
            const order = new orderModel(orderDetails);
            const saveOrder = await order.save();

            if(saveOrder?._id){
                await cartModel.deleteMany({userId: session.metadata.userId});
            }

        break;

        default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.status(200).send()
};
