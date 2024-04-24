const SER_ORDER_LIST = 'SER_ORDER_LIST'

const initialState = {
    orderList: [{
        address: "",
        cardNumber: "",
        customerNotes: "",
        date: "",
        discountCode: {
            discountPrice: 200,
            name: ""
        },
        id: "",
        orderProductList: [],
        shippingCost: 0,
        shippingType: "",
        status: null,
        totalPrice: 0
    }],
}

export const userOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SER_ORDER_LIST:
            return {
                ...state, orderList: action.newOrderList
            }
        default:
            return state
    }
}

export const setUserOrdersList = newOrderList => ({type: SER_ORDER_LIST, newOrderList})

export const getUserOrdersList = state => state.userOrders.orderList
