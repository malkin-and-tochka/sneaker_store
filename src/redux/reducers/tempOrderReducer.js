import {createSelector} from "reselect";

const SET_ORDER_LIST = 'SET_ORDER_LIST'
const SET_ORDER_ADDRESS = 'SET_ORDER_ADDRESS'
const SET_ORDER_PAYMENT = 'SET_ORDER_PAYMENT'
const SET_ORDER_DISCOUNT = 'SET_ORDER_DISCOUNT'

const initialState = {
    orderProductRequestList: [],
    address: '',
    customerNotes: '',
    discountCodeName: '',
    shippingType: 'SELF_PICK_UP',
    paymentDetailsRequest: {
        cardNumber: '',
        validFor: '',
        cvv: ''
    },
    discountCodeValue: 0
}

export const tempOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER_LIST:
            const orderList = action.cartList.map(item => {
                return {id: item.product.id, quantity: item.amount, color: item.color, size: item.size}
            })
            return {...state, orderProductRequestList: orderList}
        case SET_ORDER_ADDRESS:
            return {
                ...state,
                address: action.address,
                shippingType: action.shippingType,
                customerNotes: action.customerNotes
            }
        case SET_ORDER_PAYMENT:
            return {
                ...state,
                paymentDetailsRequest: {cardNumber: action.cardNumber, validFor: action.validFor, cvv: action.cvv}
            }
        case SET_ORDER_DISCOUNT:
            return {
                ...state,
                discountCodeName: action.discountCodeName,
                discountCodeValue: action.discountCodeValue
            }
        default:
            return state
    }
}

export const setOrderProductsList = (cartList) => ({type: SET_ORDER_LIST, cartList})
export const setOrderAddress = (address, shippingType, customerNotes) => ({
    type: SET_ORDER_ADDRESS,
    address,
    shippingType,
    customerNotes
})
export const setOrderPayment = (cardNumber, validFor, cvv) => ({
    type: SET_ORDER_ADDRESS,
    cardNumber, validFor, cvv
})
export const setOrderDiscountCode = (discountCodeName, discountCodeValue) => ({
    type: SET_ORDER_DISCOUNT,
    discountCodeName,
    discountCodeValue
})
const getTempOrderState = state => state.tempOrder;

export const getTempOrder = createSelector(
    getTempOrderState,
    tempOrder => tempOrder
);

export const getTempProducts = createSelector(
    getTempOrderState,
    tempOrder => tempOrder.orderProductRequestList
);
export const getTempDiscount = createSelector(
    getTempOrderState,
    tempOrder => tempOrder.discountCodeName
);

export const getTempAddress = createSelector(
    getTempOrderState,
    tempOrder => ({
        address: tempOrder.address,
        shippingType: tempOrder.shippingType,
        customerNotes: tempOrder.customerNotes
    })
);
