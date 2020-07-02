import { AUTH_SERVICE } from '../../utils/Constants';

const initialState = {
    loading: false,
    user: undefined,
    success: false,
    failed: false,
    cartList: [],
    tableList: []
}

const {
    REQ_LOGIN_APPS,
    SUCCES_LOGIN_APPS,
    FAILED_LOGIN_APPS,
    LOGOUT_USER,
    ADD_CART,
    ADD_TABLE_TOCART
} = AUTH_SERVICE;

export const authReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case ADD_CART:
            console.log('ITEM >>', actions.cartList);
            return {
                ...state,
                cartList: state.cartList.concat(actions.cartList),
            }
        case ADD_TABLE_TOCART:
            console.log('TABLE >>',actions.tableList);
            return {
                ...state,
                tableList: state.cartList.concat(actions.tableList)
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