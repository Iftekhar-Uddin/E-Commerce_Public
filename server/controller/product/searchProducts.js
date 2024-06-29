import productmodel from "../../models/productModel.js"

export const searchProduct = async (req, res) => {
    try {
        const query = req.query.q 
        const regex = new RegExp(query,'i','g')
        const product = await productmodel.find({ "$or" : [{productName : regex}, {category: regex}]});

        res.json({data: product, message: "Search product list"});

    } catch (error) {
        res.json({message: error.message})
    }

};


export const filterProduct = async (req, res) => {
    try {
        const category = req?.body?.category || [];
        const product = await productmodel.find( {category: {"$in": category}} );
    
        res.json({data: product, message: "Filter product list"});

    } catch (error) {
        res.json({message: error.message})
    }

};