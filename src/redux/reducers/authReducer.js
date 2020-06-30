import { AUTH_SERVICE } from '../../utils/Constants';

const initialState = {
    loading: false,
    user: undefined,
    success: false,
    failed: false,
    cartList: []
}

const {
    REQ_LOGIN_APPS,
    SUCCES_LOGIN_APPS,
    FAILED_LOGIN_APPS,
    LOGOUT_USER,
    ADD_CART
} = AUTH_SERVICE;

export const authReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case ADD_CART:
            return {
                ...state,
                cartList: state.cartList.concat(actions.cartList)
            }
        case REQ_LOGIN_APPS:
            return {
                ...state,
                loading: true
            }
        case SUCCES_LOGIN_APPS:
            return {
                ...state,
                loading: false,
                user: actions.payload,
            }
        case FAILED_LOGIN_APPS:
            return {
                ...state,
                loading: false,
                failed: true
            }
        case LOGOUT_USER:
            return{
                ...initialState
            }
        default:
            return state;
    }
}