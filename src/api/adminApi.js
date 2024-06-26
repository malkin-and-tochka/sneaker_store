import AuthManager from "./axiosManagers/authManager";

export const postProduct = async ({name, description, categoryId, price, colors, sizes}) => {
    try {
        const res = await AuthManager.post('/admin/product', {name, description, categoryId, price, colors, sizes})
        return res.data
    } catch (e) {
        console.log(e.response.data)
        return e.response.data
    }
}
export const updateProduct = async ({name, description, categoryId, price, colors, sizes, id}) => {
    try {
        console.log(name, description, categoryId, price, colors, sizes)
        const res = await AuthManager.post('/admin/product', {name, description, categoryId, price, colors, sizes, id})
        console.log('updateProduct request ===>   ', res)
        return res
    } catch (e) {
        console.log('update error:    ', e)
    }
}
export const deleteProduct = async (id) => {
    try {
        const res = await AuthManager.delete(`/admin/product/${id}`)
        console.log(res)
        return res
    } catch (e) {
        console.log(e)
    }
}
export const postProductImage = async (multipartFile, config) => {
    try {
        const res = await AuthManager.post('/admin/product/img', multipartFile, config)
        return res.status
    } catch (e) {
        console.log(e.response.data)
    }
}
export const postCategory = async (name, description) => {
    try {
        const res = await AuthManager.post('/admin/category', {"name": name, "description": description})
        return res.data
    } catch (e) {
        console.log(e.response.data)
        return e.response.data
    }
}

export const postCategoryImage = async (multipartFile, config) => {
    try {
        const res = await AuthManager.post('/admin/category/img', multipartFile, config)
        console.log('post image answer', res)
        return res.status
    } catch (e) {
        console.log(e)
    }
}

export const deleteCategory = async (id) => {
    try {
        const res = await AuthManager.delete(`/admin/category   /${id}`)
        console.log(res)
        return res
    } catch (e) {
        console.log(e)
        return e.response.data
    }
}

export const postDiscount = async (discountName, discountPrice) => {
    try {
        const res = await AuthManager.post('/admin/discountCode', {name: discountName, discountPrice})
        return res.status
    } catch (e) {
        console.log(e.response.data)
        return e.response.data
    }
}
