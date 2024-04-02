const SET_PRODUCTS = 'SET-PRODUCTS'


const initialState = {}


export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return action.newState
        default:
            return state
    }
}

const setProducts = newState => ({type:SET_PRODUCTS, newState})
