import authManager from "./axiosManagers/authManager";

export const getOrders = async () => {
    try {
        const res = await authManager.get('/orders')
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const postOrder = async ({
                                    orderProductRequestList,
                                    discountCodeName,
                                    address,
                                    customerNotes,
                                    shippingType,
                                    paymentDetailsRequest
                                }) => {
    try {
        if (discountCodeName.length === 0) {
            const res = await authManager.post('/orders', {
                orderProductRequestList,
                address,
                customerNotes,
                shippingType,
                paymentDetailsRequest
            })
            return res.status
        } else {
            const res = await authManager.post('/orders', {
                orderProductRequestList,
                discountCodeName,
                address,
                customerNotes,
                shippingType,
                paymentDetailsRequest
            })
            return res.status
        }
    } catch (e) {
        // console.log('requestSSS ', e.message)
        console.log('requestSSS ', e.response.data)
    }
}
export const getOrderById = async (id) => {
    try {
        const res = await authManager.get(`/orders/${id}`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const deleteOrderById = async (id) => {
    try {
        const res = await authManager.delete(`/orders/${id}`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getDiscountByName = async (name) => {
    try {
        const res = await authManager.get(`/orders/discountCode/${name}`)
        return res.data
    } catch (e) {
        console.log('request ', e)
    }
}
