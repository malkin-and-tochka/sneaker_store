import {createSelector} from "reselect";

const SET_ORDER_LIST = 'SET_ORDER_LIST'
const SET_ORDER_ADDRESS = 'SET_ORDER_ADDRESS'
const SET_ORDER_USER_NOTES = 'SET_ORDER_USER_NOTES'
const SET_ORDER_USER_SHIPPING = 'SET_ORDER_USER_SHIPPING'
const SET_ORDER_ADDRESS_DATA = 'SET_ORDER_ADDRESS_DATA'
const SET_ORDER_PAYMENT = 'SET_ORDER_PAYMENT'
const SET_ORDER_PAYMENT_CARD = 'SET_ORDER_PAYMENT_CARD'
const SET_ORDER_PAYMENT_VALID = 'SET_ORDER_PAYMENT_VALID'
const SET_ORDER_PAYMENT_CVV = 'SET_ORDER_PAYMENT_CVV'
const SET_ORDER_DISCOUNT = 'SET_ORDER_DISCOUNT'
const SET_ORDER_DISCOUNT_CODE_NAME = 'SET_ORDER_DISCOUNT_CODE_NAME'
const RESET_ORDER = 'RESET_ORDER'

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
        case SET_ORDER_ADDRESS_DATA:
            return {
                ...state,
                address: action.address,
                shippingType: action.shippingType,
                customerNotes: action.customerNotes
            }
        case SET_ORDER_ADDRESS:
            return {
                ...state,
                address: action.address,
            }
        case SET_ORDER_USER_NOTES:
            return {
                ...state,
                customerNotes: action.customerNotes,
            }
        case SET_ORDER_USER_SHIPPING:
            return {
                ...state,
                shippingType: action.shippingType,
            }
        case SET_ORDER_PAYMENT:
            return {
                ...state,
                paymentDetailsRequest: {cardNumber: action.cardNumber, validFor: action.validFor, cvv: action.cvv}
            }
        case SET_ORDER_PAYMENT_VALID:
            return {
                ...state,
                paymentDetailsRequest: {
                    ...state.paymentDetailsRequest,
                    validFor: action.validFor,
                }
            }
        case SET_ORDER_PAYMENT_CVV:
            return {
                ...state,
                paymentDetailsRequest: {
                    ...state.paymentDetailsRequest,
                    cvv: action.cvv,
                }
            }
        case SET_ORDER_PAYMENT_CARD:
            return {
                ...state,
                paymentDetailsRequest: {
                    ...state.paymentDetailsRequest,
                    cardNumber: action.cardNumber,
                }
            }
        case SET_ORDER_DISCOUNT:
            return {
                ...state,
                discountCodeName: action.discountCodeName,
                discountCodeValue: action.discountCodeValue
            }
        case SET_ORDER_DISCOUNT_CODE_NAME:
            return {
                ...state,
                discountCodeName: action.discountCodeName,
            }
        case RESET_ORDER:
            return {
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
        default:
            return state
    }
}

export const setOrderProductsList = (cartList) => ({type: SET_ORDER_LIST, cartList})
export const setOrderAddressData = (address, shippingType, customerNotes) => ({
    type: SET_ORDER_ADDRESS_DATA,
    address,
    shippingType,
    customerNotes
})
export const setOrderAddress = (address) => ({
    type: SET_ORDER_ADDRESS,
    address,
})
export const setOrderCustomerNotes = (customerNotes) => ({
    type: SET_ORDER_USER_NOTES,
    customerNotes,
})
export const setOrderShipping = (shippingType) => ({
    type: SET_ORDER_USER_SHIPPING,
    shippingType,
})
export const setOrderPayment = (cardNumber, validFor, cvv) => ({
    type: SET_ORDER_PAYMENT,
    cardNumber, validFor, cvv
})
export const setOrderPaymentCardNumber = (cardNumber) => ({
    type: SET_ORDER_PAYMENT_CARD,
    cardNumber
})
export const setOrderPaymentValid = (validFor) => ({
    type: SET_ORDER_PAYMENT_VALID,
    validFor
})
export const setOrderPaymentCvv = (cvv) => ({
    type: SET_ORDER_PAYMENT_CVV,
    cvv
})
export const setOrderDiscountCode = (discountCodeName, discountCodeValue) => ({
    type: SET_ORDER_DISCOUNT,
    discountCodeName,
    discountCodeValue
})
export const setOrderDiscountCodeName = (discountCodeName) => ({
    type: SET_ORDER_DISCOUNT_CODE_NAME,
    discountCodeName,
})
export const resetTempOrder = () => ({type: RESET_ORDER})

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
export const getTempOrderPayment = createSelector(
    getTempOrderState,
    tempOrder => tempOrder.paymentDetailsRequest
);

export const getTempAddress = createSelector(
    getTempOrderState,
    tempOrder => ({
        address: tempOrder.address,
        shippingType: tempOrder.shippingType,
        customerNotes: tempOrder.customerNotes
    })
);
