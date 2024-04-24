import {combineReducers, createStore} from "redux";
import {cartReducer} from "./reducers/cartReducer";
import {productsReducer} from "./reducers/productsReducer";
import {accountReducer} from "./reducers/accauntReducer";
import {paginatorReducer} from "./reducers/paginatorReducer";
import {authReducer} from "./reducers/authReducer";
import {categoryReducer} from "./reducers/categoriesReducer";
import {favoritesReducer} from "./reducers/favoritesReducer";
import {tempOrderReducer} from "./reducers/tempOrderReducer";
import {userOrdersReducer} from "./reducers/userOrdersReducer";


const reducer = combineReducers({
    cart: cartReducer,
    products: productsReducer,
    account: accountReducer,
    pagination: paginatorReducer,
    auth: authReducer,
    categories: categoryReducer,
    favorites: favoritesReducer,
    tempOrder: tempOrderReducer,
    userOrders: userOrdersReducer
})

export const store = createStore(reducer)
