import { URLS } from "../constants"
import API from "../utils/API"


export const list = async()=>{
    return API.get(`${URLS.PRODUCTS}`)
}
export const getProduct = async(id)=>{
    return API.get(`${URLS.PRODUCTS}/${id}`)
}

