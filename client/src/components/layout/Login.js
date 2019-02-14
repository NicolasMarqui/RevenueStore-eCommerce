import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/actions";
import classnames from "classnames";

class Login extends Component {

    componentDidMount = () => {
      if(this.props.auth.isAutenticado){
        this.props.history.push('/minhaConta')
      }

      console.log(this.state.erros)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAutenticado) {
          this.props.history.push("/minhaConta");
        }
    if (nextProps.erros) {
          this.setState({
            erros: nextProps.erros
          });
        }
      }

    constructor(props){
        super(props);

        this.state = {
            email: '',
            senha: '',
            erros: {}
        }
    }

    handleLogin = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitUser = e => {
        e.preventDefault();

        console.log(this.props.auth)

        const userData = {
            email: this.state.email,
            senha: this.state.senha,
        }

        console.log(this.props.loginUser(userData))
        console.log(this.state.erros)
        this.props.loginUser(userData);
    }

  render() {

    const { erros } = this.state;
    return (
      <div className="mainLoginWrapper">
        <div className="centerLogin">
            <div className="loginInputs">
                <input type="text" 
                placeholder="email"  
                name="email" 
                value={this.state.email} 
                onChange={this.handleLogin}
                error={erros.email}
                className={classnames("", {invalid: erros.email || erros.emailNotFound})}
                />
                <br />
                <span className="red-text">
                  {erros.email}
                  {erros.emailNotFound}
                </span>

                <input type="password" 
                placeholder="senha" 
                name="senha" 
                value={this.state.senha} 
                onChange={this.handleLogin}
                error={erros.senha}
                className={classnames("", {invalid: erros.senha || erros.senhaIncorreta })}
                />

                <span className="red-text">
                  {erros.senha}
                  {erros.senhaIncorreta}
                </span>

            </div>
            <button type="submit" onClick={this.submitUser}>Login</button>

            <h2>Não tem conta?<br /><Link to="/signup" style={{textDecoration: 'none'}}><code>Criar Uma</code></Link></h2>
            <div className="goHome">
                <Link to="/" style={{textDecoration: 'none', color: '#fff'}}><h5 style={{padding: '2%'}}>Home</h5></Link>
            </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    erros: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.userAuth,
    erros: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login)