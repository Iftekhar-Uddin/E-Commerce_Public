import api from "../api/api"
import { toast } from 'react-toastify'

const addToCartProduct = async(e, id) =>{
    e?.stopPropagation()
    e?.preventDefault()

    const response = await fetch(api.addToCartProduct.url,{
        method : api.addToCartProduct.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            { productId : id }
        )
    })
    
    const res = await response.json()

    if(res){
        toast.success(res.message)
    }

    if(res.error){
        toast.error(res.message)
    }
    return res
}


export default addToCartProduct