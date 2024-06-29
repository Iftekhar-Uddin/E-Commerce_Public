import productmodel from "../../models/productModel.js"
import usermodel from "../../models/userModel.js"

export const uploadProduct = async (req, res) => {
    try {
        const userId = req.userId
        const user = await usermodel.findById(userId);
        
        if(user.role === "ADMIN"){
            const uploadProduct = new productmodel(req.body)
            const saveProduct = await uploadProduct.save()
    
            res.json({data: saveProduct, message: "Upload product successfully"});
        }else{
            throw new Error("Permission denied")
        }

    } catch (error) {
        res.status(400).json({message: error.message})
    }

};


export const updateProduct = async (req, res) => {
    try {
        const userId = req.userId
        const user = await usermodel.findById(userId)
        const { _id, ...resBody} = req.body

        if(user.role === "ADMIN"){
            const updateProduct = await productmodel.findByIdAndUpdate(_id, resBody);
            res.json({data: updateProduct, message: "Update product successfully"});
        }

        if(user.role === "GENERAL"){
            throw new Error("Permission denied")
        }

    } catch (error) {
        res.status(400).json({message: error.message})
    }

};


export const deleteProduct = async (req, res) => {
    try {
        const userId = req.userId

        const user = await usermodel.findById(userId)
        const { _id} = req.body

        if(user.role === "ADMIN"){
            await productmodel.findByIdAndDelete(_id);
            res.json({message: "Product deleted successfully"});
        }

        if(user.role === "GENERAL"){
            throw new Error("Permission denied")
        }

    } catch (error) {
        res.status(400).json({message: error.message})
    }

};

