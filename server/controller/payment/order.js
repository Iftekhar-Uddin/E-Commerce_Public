import orderModel from "../../models/orderModel.js";


export const order = async (req, res) => {
    try {
        const currentUser = req.userId;
        const orderList  = await orderModel.find({userId: currentUser}).sort({createdAt: -1});
        res.json({
            data: orderList,
            message: "Order List",
            success: true
        });

    } catch (error) {
        res.json({
            message: error?.message || error,
            error: true,
            success: false
        })
    }
};
