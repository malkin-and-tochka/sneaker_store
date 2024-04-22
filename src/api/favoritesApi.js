import authManager from "./axiosManagers/authManager";

export const getFavorites = async () => {
    try {
        const res = await authManager.get('/account/wishlist')
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const postFavorite = async (productId) => {
    try {
        return await authManager.post(`/account/wishlist/${productId}`)
    } catch (e) {
        console.log(e)
    }
}
export const deleteFavorite = async (productId) => {
    try {
        return await authManager.delete(`/account/wishlist/${productId}`)
    } catch (e) {
        console.log(e)
    }
}
