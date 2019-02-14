import { FETCH_DATA , PROD_CART, IS_LOGGED, GET_ERRORS, SET_CURRENT_USER, USER_LOADING} from './actionTypes';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const getDataFromDataBase = () => {
    return dispatch => {

        dispatch(FETCH_DATA);

        axios.get("/api/produtos/all")
            .then(res => {
                console.log(res.data)
                dispatch(getData(res.data))
            })
            .catch(err => console.log(err))
    }
}

const getData = data => ({
    type: FETCH_DATA,
    produtos: {
        ...data
    }
})

export const getCart = (items) => ({
    type: PROD_CART,
    produtos: items,
})

export const saveUserStatus = (status) => ({
    type: IS_LOGGED,
    logado: status,
})


export const registerUser = (userData, history) => dispatch =>  {
    axios.post('/api/produtos/signup', userData)
        .then(res => history.push("/login"))
        .catch(err => dispatch({ type: GET_ERRORS , payload: err.response.data}))
}

export const SetCurrentUser = decoded => {
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const loginUser = userData => dispatch => {
    axios.post('/api/produtos/login', userData)
        .then(res => {

            const { token } = res.data;
            localStorage.setItem("jwtToken", token);

            setAuthToken(token);

            const decoded = jwt_decode(token);

            dispatch(SetCurrentUser(decoded))

        })
        .catch(err => dispatch({ type: GET_ERRORS , payload: err.response.data}))
}

export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(SetCurrentUser({}));
  };

export const setUserLoading = () => {
    return {
      type: USER_LOADING
    };
};
 