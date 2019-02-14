import { combineReducers } from 'redux';
import { getProducts } from './getProducts';
import { userRelated } from './userRelated';
import authUser from './authReducer';
import errors from './errorReducer';

const RootReducer = combineReducers({
    prod: getProducts,
    user: userRelated,
    userAuth: authUser,
    errors
})

export default RootReducer;