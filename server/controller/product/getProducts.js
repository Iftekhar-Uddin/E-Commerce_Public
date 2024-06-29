import productmodel from "../../models/productModel.js"

export const getAllProduct = async (req, res) => {
    try {

        const allProduct = await productmodel.find().sort({createdAt : -1});
        res.json({data: allProduct, message: "All product"});

    } catch (error) {
        res.status(400).json({message: error.message})
    }

};

export const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productmodel.findById(productId)
        res.json({data: product, message: true})

    } catch (error) {
        res.json({message: error.message})
    }
};


export const getProductByCategory = async (req, res) => {
    try {

        const { category } = req?.body || req?.query
        const product = await productmodel.find({ category })
        res.json({data: product, message: "Product found by category"});

    } catch (error) {
        res.status(400).json({message: error.message})
    }

};


export const getCategoriesProduct = async (req, res) => {
    try {

        const totalCategories = await productmodel.distinct("category");

        const productByCategory = [];

        for(const category of totalCategories){
            const product = await productmodel.findOne({category })

            if(product){
                productByCategory.push(product)
            }
        }

        res.json({data: productByCategory, message: "Product found by categories"});

    } catch (error) {
        res.status(400).json({message: error.message})
    }

};


