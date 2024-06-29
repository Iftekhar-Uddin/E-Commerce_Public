const API = process.env.REACT_APP_API_URL;
// const API = 'http://localhost:5000';

const api = {
    signUp : {
        url : `${API}/signup`,
        method: "post"
    },
    signIn : {
        url : `${API}/signin`,
        method : "post"
    },
    details_user : {
        url : `${API}/detailsuser`,
        method : "get"
    },
    logout_user : {
        url : `${API}/logout`,
        method : 'get'
    },
    allUser : {
        url : `${API}/alluser`,
        method : 'get'
    },
    updateUser : {
        url : `${API}/updateuser`,
        method : "post"
    },
    uploadProduct : {
        url : `${API}/uploadproduct`,
        method : 'post'
    },
    allProduct : {
        url : `${API}/getproduct`,
        method : 'get'
    },
    updateProduct : {
        url : `${API}/updateproduct`,
        method  : 'post'
    },
    deleteProduct : {
        url : `${API}/deleteproduct`,
        method  : 'delete'
    },
    categoryProduct : {
        url : `${API}/getcategoriesproduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${API}/getproductbycategory`,
        method : 'post'
    },
    productDetails : {
        url : `${API}/getproductdetails`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${API}/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${API}/addcartcounts`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${API}/addcartview`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${API}/updatecart`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${API}/daletecart`,
        method : 'delete'
    },
    searchProduct : {
        url : `${API}/searchproduct`,
        method : 'get'
    },
    filterProduct : {
        url : `${API}/filterProduct`,
        method : 'post'
    },
    payment : {
        url : `${API}/payment`,
        method : 'post'
    },
    order : {
        url : `${API}/order`,
        method : 'get'
    }
}

export default api
