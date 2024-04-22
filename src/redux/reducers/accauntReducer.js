const SET_FIRST_NAME = 'SET-FIRST-NAME'
const SET_LAST_NAME = 'SET-LAST-NAME'
const SET_EMAIL = 'SET-EMAIL'
const SET_MOBILE_PHONE = 'SET-MOBILE-PHONE'
const SET_ALL_ACCOUNT_INFO = 'SET-ALL-ACCOUNT-INFO'
const SET_ROLES = 'SET_ROLES'

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    mobilePhone: "",
    roles: []
};
export const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FIRST_NAME:
            return {
                ...state,
                firstName: action.firstName
            };
        case SET_LAST_NAME:
            return {
                ...state,
                lastName: action.lastName
            };
        case SET_EMAIL:
            return {
                ...state,
                email: action.email
            };
        case SET_MOBILE_PHONE:
            return {
                ...state,
                mobilePhone: action.mobilePhone
            };
        case SET_ROLES:
            return {...state, roles: action.roles}
        case SET_ALL_ACCOUNT_INFO:
            return {...state,...action.newState}
        default:
            return state;
    }
};
export const setMobilePhone = mobilePhone => ({type: SET_MOBILE_PHONE, mobilePhone})
export const setEmail = email => ({type: SET_EMAIL, email})
export const setLastName = lastName => ({type: SET_LAST_NAME, lastName})
export const setFirstName = firstName => ({type: SET_FIRST_NAME, firstName})
export const setRoles = roles => ({type: SET_ROLES, roles})
export const setAllAccountInfo = newState => ({type: SET_ALL_ACCOUNT_INFO, newState})

const getFirstName = (state) => state.firstName;
const getLastName = (state) => state.lastName;
const getEmail = (state) => state.email;
const getMobilePhone = (state) => state.mobilePhone;

export const getAccountInfoSelector = (state) => state.account
export const isUserAdmin = state => state.account.roles.some(role => role === 'ADMIN')
