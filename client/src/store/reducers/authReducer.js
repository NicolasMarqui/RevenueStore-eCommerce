import { SET_CURRENT_USER, USER_LOADING } from '../actions/actionTypes';
const isEmpty = require('is-empty');

const initialState = {
    isAutenticado: false,
    user: {},
    loading: false,
}

export default function (state = initialState, action) {
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                ...state,
                isAutenticado: !isEmpty(action.payload),
                user: action.payload
            }
        case USER_LOADING:
            return{
                ...state,
                loading: true
            }
        default:
            return state
    }
}