export const SET_AUTH = 'SET_AUTH';


const initialState = {
    isAuth: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuth: action.isAuth,
            };
        default:
            return state;
    }
};

export const setAuth = (isAuth) => ({type: SET_AUTH, isAuth,});
export const getIsAuth = (state) => state.auth.isAuth;
