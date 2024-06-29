import cartmodel from "../../models/cartModel.js"

export const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const {productId} = req.body;
        const productAvailable = await cartmodel.findOne({ productId, userId : userId });
    
        if(productAvailable){
            return res.json({message: "Product already exist in cart!"});
        }else{
            const productData = {
                userId : userId,
                productId: productId,
                quantity: 1
            }

            const saveProduct = await new cartmodel(productData).save();
            return res.json({data: saveProduct, message: "Product added successfully"})
        }
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }

};


export const addCartView = async (req, res) => {
    try {
        const allProduct = await cartmodel.find({
            userId : req.userId
        }).populate("productId");
    
        res.json({data: allProduct});

    } catch (error) {
        res.status(400).json({message: error.message})
    }

};


export const addCartCounts = async (req, res) => {
    try {
        const count = await cartmodel.countDocuments({userId : req.userId})
    
        res.json({data:{count: count}, message: "successfull"});
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }

};

