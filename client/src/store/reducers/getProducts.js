import { PROD_CART} from '../actions/actionTypes';

const InitialState = {
    produtos: [],
}

export const getProducts = (state = InitialState,action) => {
    switch(action.type){
        case PROD_CART:
            return{
                ...state,
                produtos: action.produtos
            }
        default:
            return state
    }
}