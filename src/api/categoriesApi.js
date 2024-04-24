import apiManager from "./axiosManagers/apiManager";


export const getCategories = async () => {
    try {
        const res = await apiManager.get('/categories')
        return res.data
    } catch (e) {
        console.log(e)
    }
}
