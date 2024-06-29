import express from 'express'
const router = express.Router();
import verify from "../middleware/verify.js";
import {getAllProduct, getProductDetails, getProductByCategory, getCategoriesProduct} from "../controller/product/getProducts.js";
import {uploadProduct, updateProduct, deleteProduct} from "../controller/product/upload_update_delete.js";
import {searchProduct, filterProduct} from "../controller/product/searchProducts.js";

//Product get
router.get('/getproduct', getAllProduct);
router.post('/getproductdetails', getProductDetails);
router.post('/getproductbycategory', getProductByCategory);
router.get('/getcategoriesproduct', getCategoriesProduct);

//Product create, update, delete
router.post('/uploadproduct', verify,  uploadProduct);
router.post('/updateproduct', verify,  updateProduct);
router.delete('/deleteproduct', verify, deleteProduct);

// Product search
router.get('/searchproduct', searchProduct);
router.post('/filterProduct', filterProduct)

export default router;