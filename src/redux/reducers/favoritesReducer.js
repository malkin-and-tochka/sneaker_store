const SET_FAVORITES = 'SET_FAVORITES';
const ADD_ITEM_TO_FAVORITES = 'ADD_ITEM_TO_FAVORITES';
const REMOVE_ITEM_FROM_FAVORITES = 'REMOVE_ITEM_FROM_FAVORITES';
const REMOVE_ALL_ITEMS_FROM_FAVORITES = 'REMOVE_ALL_ITEMS_FROM_FAVORITES';

const initialState = {
    favList: []
}

export const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FAVORITES:
            const successImagesProducts = action.newFavList.map(el => {
                el.imageResponseList.forEach(img => img.url = img.url.replace('localhost', '192.168.105.208'))
                return el
            })
            return {...state, favList: successImagesProducts}
        case ADD_ITEM_TO_FAVORITES:
            return {
                ...state,
                favList: [...state.favList, action.newItem],
            };
        case REMOVE_ITEM_FROM_FAVORITES:
            return {
                ...state,
                favList: state.favList.filter((item) => item.id !== action.id),
            };
        case REMOVE_ALL_ITEMS_FROM_FAVORITES:
            return {
                ...state,
                favList: [],
            };
        default:
            return state;
    }
};


export const setFavorites = (newFavList) => ({type: SET_FAVORITES, newFavList});
export const addToFavorites = (newItem) => ({type: ADD_ITEM_TO_FAVORITES, newItem});
export const removeFromFavorites = (id) => ({type: REMOVE_ITEM_FROM_FAVORITES, id});
export const removeAllItemsFromFavorites = () => ({type: REMOVE_ALL_ITEMS_FROM_FAVORITES});
export const getFavList = state => state.favorites.favList
export const isProductInFavorites = itemId => state => state.favorites.favList.some(item => item.id === itemId)

