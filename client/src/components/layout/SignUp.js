import React, { Component } from 'react';
import { Link , withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../store/actions/actions';
import classnames from 'classnames';
import PropTypes from "prop-types";

class SignUp extends Component {

  constructor(props){
    super(props);

    this.state = {
      nome: '',
      email: '',
      senha: '',
      endereco: '',
      erros: {},
    }
  }

  componentDidMount = () => {
    if(this.props.auth.isAutenticado){
      this.props.history.push('/minhaConta')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.erros) {
      this.setState({
        erros: nextProps.erros
      });
    }
  }

  handleSign = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  sendSign = e => {
    e.preventDefault();
    
    const userData = {
      nome: this.state.nome,
      email: this.state.email,
      senha: this.state.senha,
      endereco: this.state.endereco
    }

    this.props.registerUser(userData, this.props.history)
  }

  render() {

    const { erros } = this.state

    return (
      <div className="mainWrapperSign">
        <div className="leftSideSign">
          <h1><Link to="/" style={{textDecoration: 'none', color: '#333'}}>Home</Link></h1>
        </div>
        <div className="rightSideSign">
          <div className="centerSign">
            <input type="text" 
            placeholder="Nome"
            name="nome" 
            value={this.state.nome} 
            onChange={this.handleSign} 
            error={erros.nome}
            className={classnames("", { invalid: erros.nome })}/>
            <br />
            <span className="red-text">{erros.nome}</span>

            <input type="text"
             placeholder="Email"
             name="email" 
             value={this.state.email} 
             onChange={this.handleSign} 
             error={erros.email}
             className={classnames("", { invalid: erros.email })}
             />
             <br />
             <span className="red-text">{erros.email}</span>

            <input type="password" 
            placeholder="Senha" 
            name="senha" 
            value={this.state.senha} 
            onChange={this.handleSign} 
            error={erros.senha}
            className={classnames("", { invalid: erros.senha })}
            />
            <br />
            <span className="red-text">{erros.senha}</span>

            <input type="text" 
            placeholder="Endereço" 
            name="endereco" 
            value={this.state.endereco} 
            onChange={this.handleSign} 
            error={erros.endereco}
            className={classnames("", { invalid: erros.endereco })}
            />
            <br />
            <span className="red-text">{erros.endereco}</span>

            <button type="submit" onClick={this.sendSign}>Sign Up</button>
          </div>
        </div>
      </div>
    )
  }
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  erros: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.userAuth,
  erros: state.errors
})


export default connect(mapStateToProps, { registerUser })(withRouter(SignUp))