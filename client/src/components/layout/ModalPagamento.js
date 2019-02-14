import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ModalPagamento extends Component {

  componentDidMount = () => {
    console.log(this.props.auth)
  }

    constructor(props){
        super(props);

        this.state = {
            total: [],
            isComprando: false,
        }
    }

    finishCount = (e) => {
      e.preventDefault();
      if(this.props.auth.isAutenticado){
        this.setState({ isComprando: true  })
      }else{
        this.setState({ isComprando: false  })
      }
    }

  render() {
    return (
      <div>
        <div className="modalPagamento">
            <div className="modalMain">
                <button className="close">X</button>
                <h1 style={{display: 'none'}}>{this.props.preco.map(eae => this.state.total.push(eae.props.children.props.children))}</h1>
                <h1>Sua Compra: </h1>
                <h1>Preço frete = <code>R${this.props.frete},00</code></h1>
                <h1>Preco total: <code>R${this.state.total !== [] ? this.state.total.reduce((a,b) => a + b , 0).toFixed(2) : 'Carregando...'}</code></h1>

                <code style={{padding: '2%'}}>Método de Pagamento: </code>
                <br />
                <label style={{padding: '2%'}} htmlFor="boleto">Boleto</label>
                <input style={{padding: '2%'}} type="checkbox" name="boleto"/>
                <br />
                <label style={{padding: '2%'}} htmlFor="cartao">Cartão</label>
                <input style={{padding: '2%'}} type="checkbox" name="cartao"/>
                <br />

                <Button color="success" style={{padding: '2%', margin: '2% 0'}} onClick={this.finishCount} disabled={this.state.isComprando ? false : true}>Finalizar</Button>
                <br />
                <code>{this.state.isComprando  ? 'Obrigado por comprar conosco' : <Link to="/login" style={{textDecoration: 'none'}}>Faça <b style={{textDecoration: 'blue'}}>Login</b> antes de continuar</Link>}</code>
            
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.userAuth,
})


export default connect(mapStateToProps)(ModalPagamento)