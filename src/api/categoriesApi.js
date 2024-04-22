import AuthManager from "./axiosManagers/authManager";


export const getCategories = async () => {
    try {
        const res = await AuthManager.get('/categories')
        return res.data
    } catch (e) {
        console.log(e)
    }
}
