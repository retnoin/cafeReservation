import { AUTH_SERVICE } from '../../utils/Constants';

const initialState = {
    loading: false,
    user: undefined,
    success: false,
    failed: false,
    cartFoodList: [],
    cartDrinkList: [],
    tableList: [],
    badge: 0
}

const {
    REQ_LOGIN_APPS,
    SUCCES_LOGIN_APPS,
    FAILED_LOGIN_APPS,
    LOGOUT_USER,
    ADD_FOOD_CART,
    ADD_DRINK_CART,
    ADD_TABLE_TOCART,
    BADGE
} = AUTH_SERVICE;

export const authReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case ADD_FOOD_CART:
            console.log('ITEM >>', actions.cartFoodList);
            return {
                ...state,
                cartFoodList: state.cartFoodList.concat(actions.cartFoodList),
            }
        case ADD_DRINK_CART:
            console.log('ITEM >>', actions.cartDrinkList);
            return {
                ...state,
                cartDrinkList: state.cartDrinkList.concat(actions.cartDrinkList),
            }
        case ADD_TABLE_TOCART:
            console.log('TABLE >>',actions.tableList);
            return {
                ...state,
                tableList: state.tableList.concat(actions.tableList)
            }
        case BADGE:
            console.log('TABLE >>',actions.badge);
            return {
                ...state,
                badge: actions.badge
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