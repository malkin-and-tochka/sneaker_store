import {useMemo} from "react";
import {createSelector} from "reselect";

const SET_PRODUCTS = 'SET-PRODUCTS'
const DELETE_PRODUCTS = 'DELETE-PRODUCTS'
const ADD_PRODUCT = 'ADD-PRODUCT'

const initialState = {
    productsList: []
}


export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            const successImagesProducts = action.newState.map(el => {
                el.imageResponseList.forEach(img => img.url = img.url.replace('localhost', '192.168.105.208'))
                return el
            })
            return {...state, productsList: successImagesProducts}
        case ADD_PRODUCT:
            return {
                ...state,
                productsList: [...state.products.productsList, action.product]
            }
        default:
            return state
    }
}

export const setProducts = newState => ({type: SET_PRODUCTS, newState})
export const addProduct = product => ({type: ADD_PRODUCT, product})


export const getProductsSelector = state => state.products.productsList
export const getProductsByCategory = category => state => state.products.productsList.filter(el => el.categoryName === category)

const selectCategory = (state, category) => category;
export const selectProductsByCategory = createSelector(
    [getProductsSelector, selectCategory],
    (productsList, category) => productsList.filter(el => el.categoryName === category)
);
