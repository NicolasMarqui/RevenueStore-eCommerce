import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/actions';
import { Button, Spinner } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class minhaConta extends Component {

  componentDidMount = () => {
    console.log(this.props.auth);

    axios.get(`/api/produtos/userInfo/${this.props.auth.user.id}`)
      .then(res => this.setState({ userInfo: res.data , userLoaded: true}))
      .catch(err => console.log(err))

  }

  constructor(props){
    super(props);

    this.state = {
      userInfo: [],
      userLoaded: false,
    }
  }

  logoutUser = e => {
    e.preventDefault();

    this.props.logoutUser();
  }

  render() {
    return (
      <div className="minhaContaWrapper">
        <div className="mainContaHeader">
          <div className="centerHello">
            <h1 style={{color: '#ffffff'}}>Seja Bem vindo ,<br />
            <strong><code>{this.props.auth.user.name}</code></strong>
            </h1>
            <Button color="danger" onClick={this.logoutUser} >Logout</Button>
            <Link to="/produtos" style={{textDecoration: 'none', color: '#fff'}}><Button color="primary">Ir as compras</Button></Link>
            <Link to="/" style={{textDecoration: 'none', color: '#fff'}}><Button color="dark">Home</Button></Link>
          </div>
        </div>
         <div className="showEnderecoWrapper">
            <div className="currentAdress">
              <div className="centerCurrent">
                <p>Seu endereço atual</p>
                {
                  this.state.userLoaded ? 
                  <code style={{fontSize: '20px'}}>{this.state.userInfo.endereco}</code>
                  :
                  <Spinner color="dark"></Spinner>
                }
                <br />
              </div>
            </div>
            <div className="imageDivider">
              <h1>Esse não é seu endereço?</h1>
              <Button color="dark">Trocar Endereço</Button>
            </div>
         </div>
      </div>
    )
  }
}

minhaConta.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  auth: state.userAuth,
})

export default connect(mapStatetoProps, {logoutUser})(minhaConta)