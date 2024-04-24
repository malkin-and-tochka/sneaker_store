import apiManager from "./axiosManagers/apiManager";
import authManager from "./axiosManagers/authManager";

export const getAllProducts = async () => {
    try {
        const res =  await apiManager.get('/products')
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getProductById = async id => {
    try {
        const res =  await authManager.get('/products', {id})
        console.log('request:',res.data)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
