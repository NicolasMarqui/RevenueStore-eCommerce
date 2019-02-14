import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import jwt_decode from "jwt-decode";
import setAuthToken from '../utils/setAuthToken';
import { SetCurrentUser, logoutUser } from "../store/actions/actions";

import App from '../App';
import Main from '../components/layout/mainProdutos';
import Carrinho from '../components/layout/Carrinho';
import Info from '../components/layout/Informacoes';
import Login from '../components/layout/Login';
import SignUp from '../components/layout/SignUp';
import MinhaConta from '../components/layout/minhaConta';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import store from '../store/index';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(SetCurrentUser(decoded));
  // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "./login";
    }
  }

const Routing = () => (
    <Provider store={store}>
    <ToastContainer />
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/produtos" component={Main} />
                <Route exact path="/cart" component={Carrinho} />
                <Route exact path="/info/:id" component={Info} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <PrivateRoute exaxt path="/minhaConta" component={MinhaConta} />
            </Switch>
        </Router>
    </Provider>
)

export default Routing;