const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CHANGE_PRODUCT_AMOUNT = 'CHANGE_PRODUCT_AMOUNT';
const INCREMENT_AMOUNT = 'INCREMENT_AMOUNT';
const DECREMENT_AMOUNT = 'DECREMENT_AMOUNT';
const RESET_CART_ITEMS = 'RESET_CART_ITEMS'

const initialState = {
    cartList: [],
    totalPrice: 0,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const isProdInCart = state.cartList.some((item) => item.product.id === action.product.id && item.color === action.color && item.size === action.size)
            if (isProdInCart) return state;
            const newCartList = [...state.cartList, {
                amount: 1,
                product: action.product,
                color: action.color,
                size: action.size
            }];
            const newTotalPrice = state.totalPrice + action.product.price;
            return {...state, cartList: newCartList, totalPrice: newTotalPrice};
        }
        case REMOVE_FROM_CART: {
            const newCartList = state.cartList.filter((item) => {
                console.log(!(item.product.id === action.productId && item.color === action.color && item.size === action.size))
                return !(item.product.id === action.productId && item.color === action.color && item.size === action.size)
            });
            const removedProduct = state.cartList.find((item) => item.product.id === action.productId && item.color === action.color && item.size === action.size);
            const newTotalPrice = state.totalPrice - removedProduct.product.price * removedProduct.amount;
            return {...state, cartList: newCartList, totalPrice: newTotalPrice};
        }
        // case CHANGE_PRODUCT_AMOUNT: {
        //     const newCartList = state.cartList.map((item) => {
        //         if (item.product.id === action.productId && item.color === action.color && item.size === action.size) {
        //             const priceDifference = (action.amount - item.amount) * item.product.price;
        //             return {...item, amount: action.amount, totalPrice: state.totalPrice + priceDifference};
        //         }
        //         return item;
        //     });
        //     return {...state, cartList: newCartList};
        // }
        case INCREMENT_AMOUNT: {
            let newTotalPrice = 0
            const newCartList = state.cartList.map((item) => {
                if (item.product.id === action.productId && item.color === action.color && item.size === action.size) {
                    newTotalPrice = state.totalPrice + item.product.price;
                    return {...item, amount: item.amount + 1};
                }
                return item;
            });
            return {...state, cartList: newCartList, totalPrice: newTotalPrice};
        }
        case DECREMENT_AMOUNT: {
            let newTotalPrice = 0
            const newCartList = state.cartList.map((item) => {
                if (item.product.id === action.productId && item.color === action.color && item.size === action.size && item.amount > 1) {
                    newTotalPrice = state.totalPrice - item.product.price;
                    return {...item, amount: item.amount - 1};
                }
                return item;
            });
            return {...state, cartList: newCartList, totalPrice: newTotalPrice};
        }
        case RESET_CART_ITEMS: {
            return {...state, cartList: [], totalPrice: 0};
        }
        default:
            return state;
    }
};

export const addToCart = (product, color, size) => ({type: ADD_TO_CART, product, color, size});
export const removeFromCart = (productId, color, size) => ({type: REMOVE_FROM_CART, productId, color, size});
export const changeProductAmount = (productId, amount, color, size) => ({
    type: CHANGE_PRODUCT_AMOUNT,
    productId,
    amount,
    color,
    size
});

export const incrementAmount = (productId, color, size) => ({type: INCREMENT_AMOUNT, productId, color, size});
export const decrementAmount = (productId, color, size) => ({type: DECREMENT_AMOUNT, productId, color, size});
export const resetCart = () => ({type: RESET_CART_ITEMS})

export const getCartList = (state) => state.cart.cartList;
export const getTotalPrice = (state) => state.cart.totalPrice;
export const isProductInCart = (productId, color, size) => state => state.cart.cartList.some((item) => item.product.id === productId && item.color === color && item.size === size)
