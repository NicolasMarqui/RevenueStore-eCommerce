import { IS_LOGGED } from '../actions/actionTypes';

const initialState = {
    isLogged:  false,
    currentUserData: []
}

export const userRelated = (state = initialState, action) => {
    switch(action.type){
        case IS_LOGGED: 
            return{
                isLogged: action.logado
            }
        default:
            return state
    }
}