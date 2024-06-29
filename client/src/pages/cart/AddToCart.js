import api from '../../api/api'
import { toast } from 'react-toastify'

const addToCart = async(e, id) =>{
    e?.stopPropagation()
    e?.preventDefault()

    const res = await fetch(api.addToCartProduct.url,{
        method : api.addToCartProduct.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            { productId : id }
        )
    })

    const resdata = await res.json()

    if(resdata){
        toast.success(resdata.message)
    }

    if(resdata.error){
        toast.error(resdata.message)
    }
    return resdata
}


export default addToCart