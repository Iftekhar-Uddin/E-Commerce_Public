import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Signin from "../pages/user/Signin";
import Register from "../pages/user/Register";
import Adminpanel from "../pages/user/Adminpanel";
import Alluser from "../pages/user/Alluser";
import AllProduct from "../pages/products/AllProduct";
import CategoryProduct from "../pages/products/CategoryProduct";
import ProductDetails from "../pages/products/ProductDetails";
import AddCartView from "../pages/cart/AddCartView";
import SearchProduct from "../components/Search";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import PaymentCancel from "../pages/payment/PaymentCancel";
import Orderdetails from "../pages/payment/Orderdetails";



const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path: '',
                element: <Home/>
            },
            {
                path: 'login',
                element: <Signin/>
            },
            {
                path: 'signup',
                element: <Register/>
            },
            {
                path: 'adminpanel',
                element: <Adminpanel/>,
                children: [
                    {
                        path: "alluser",
                        element: <Alluser/>
                    },
                    {
                        path : "getproduct",
                        element : <AllProduct/>
                    }
                ]
            },
            {
                path : "productcategory",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : "cart",
                element : <AddCartView/>
            },
            {
                path : "success",
                element : <PaymentSuccess/>
            },
            {
                path : "cancel",
                element : <PaymentCancel/>
            },
            {
                path : "order",
                element : <Orderdetails/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
        ]
    }
]);

export default router
