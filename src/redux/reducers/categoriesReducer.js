import {IP_ADDRESS} from "../../constants";

const ADD_CATEGORY = 'ADD_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';
const SET_CATEGORIES = 'SET_CATEGORIES';

const initialState = {
    categoriesList: [],
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CATEGORY:
            return {
                ...state,
                categoriesList: [...state.categoriesList, action.category],
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                categoriesList: state.categoriesList.filter(category => category.id !== action.categoryId),
            };
        case SET_CATEGORIES:
            const successImagesProducts = action.newCategories.map(el => {
                el.imageResponseList.forEach(img => img.url = img.url.replace('localhost', IP_ADDRESS))
                return el
            })
            return {
                ...state,
                categoriesList: successImagesProducts,
            };
        default:
            return state;
    }
};

export const addCategory = category => ({
    type: ADD_CATEGORY,
    category,
});

export const deleteCategory = categoryId => ({
    type: DELETE_CATEGORY,
    categoryId,
});
export const setCategories = newCategories => ({type: SET_CATEGORIES, newCategories})
export const getCategoryById = categoryId => state => state.categories.categoriesList.find(category => category.id === categoryId)
export const getAllCategories = state => state.categories.categoriesList
