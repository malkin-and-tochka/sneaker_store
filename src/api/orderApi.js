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
        console.log('request', orderProductRequestList,
            discountCodeName,
            address,
            customerNotes,
            shippingType,
            paymentDetailsRequest)
        const res = await authManager.post('/orders', {orderProductRequestList, discountCodeName, address, customerNotes, shippingType, paymentDetailsRequest})
        console.log(res.data)
        return res.data
    } catch (e) {
        console.log(e)
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
        console.log('request ',e)
    }
}
