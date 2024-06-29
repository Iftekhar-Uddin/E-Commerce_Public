import cartmodel from "../../models/cartModel.js"

export const updateCart = async (req, res) => {
    try {
        const currentUserId = req.userId 
        const ProductId = req?.body?._id
        const qty = req?.body?.quantity;

        const updateProduct = await cartmodel.updateOne({_id : ProductId}, {...(qty && {quantity : qty})});
        res.json({data: updateProduct, message: "Product Updated"})

    } catch (error) {
        res.json({message: error.message})
    }
};


export const daleteCart = async (req, res) => {
    try {
        const ProductId = req?.body?._id

        const deleteProduct = await cartmodel.deleteOne({ _id : ProductId})
        res.json({data: deleteProduct, message: "Product deleted from cart"})

    } catch (error) {
        res.json({message: error.message})
    }
};