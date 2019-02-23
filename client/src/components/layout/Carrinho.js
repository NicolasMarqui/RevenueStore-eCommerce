import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Spinner , Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import menu from '../Imagens/images.png';


import Footer from './Footer';
import Modal from './ModalPagamento';

class Carrinho extends Component {

    constructor(props){
        super(props);

        this.state = {
            produtos : false,
            Itemscarrinho: [],
            done: false,
            doneLoading: false,
            teste: [],
            valorFinal: [],
            dupli: [],
            novoDupli: [],
            quantidade: 1,
            cepValue: '',
            cepInfo: [],
            cepLoaded: false,
            modalOpen: false,
        }
    }

    componentDidMount = () => {
        window.scrollTo(0,0);
        this.props.produtosParaCarrinho.forEach(el => this.state.dupli.push(el))
        this.removeDupl(this.state.dupli);


        // this.state.novoDupli.forEach(el =>);
        axios.get('/api/produtos/all')
            .then(res => res.data.forEach(el => this.props.produtosParaCarrinho.forEach(el2 => {
                if(el._id === el2){
                    this.state.Itemscarrinho.push(el)
                    this.setState({ doneLoading: true , produtos: true, teste: res.data})
                }
            })))
            .catch(err => console.log(err));

            
    }
    // this.setState({ teste: res.data , doneLoading: !this.state.doneLoading, produtos: !this.state.produtos})
    handleChange = e => {
        this.setState({
            quantidade: e.target.value,
        })
    }

    removeDupl = name => {
        let unique = {};

        name.forEach(i => {
            if(!unique[i]){
                unique[i] = true
            }
        })

        this.state.novoDupli.push(Object.keys(unique))
        
        return Object.keys(unique)
        
    }

    saveCEP = e => {
        this.setState({
            cepValue: e.target.value,
        })
    }

    fetchCEP = () => {
        axios.get(`https://viacep.com.br/ws/${this.state.cepValue}/json/`)
            .then(res => {
                this.setState({ cepInfo: res.data, cepLoaded: true })
            })
            .catch(err => console.log(err))
    }

    changeState = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

  render() {
    return (
    <div>
        <div className="mainHeader" style={this.state.openNav ? {overflow: 'hidden',border: '2px'}: null}>
            <div className="fullNav" style={this.state.openNav ? {display: 'block'} : {display: 'none'}}>
                <div className="closeBtn">
                    <button onClick={() => this.setState({openNav: !this.state.openNav})}>X</button>
            </div>
        <div className="centerFullNav">
            <ul>
                <Link to="/"><li><span>Home</span></li></Link>
                <Link to="/produtos" style={{textDecoration: 'none'}}><li><span>Produtos</span></li></Link>
            </ul>
        </div>
      </div>
        <div className="mainNav">
            <div className="navbarBrand">
                <Link to="/" style={{textDecoration: 'none'}}><h2>Revenue<br />store</h2></Link>
            </div>
            <div className="menuOrLinks">
                <img src={menu} alt="menu" height="80px" width="80px" style={{cursor: "pointer"}} onClick={() => this.setState({ openNav: !this.state.openNav })}/>
            </div>
        </div>
        <div className="carrinhoMain">
        <h1 style={!this.state.produtos ? {display: 'none'} : {display: 'block'}}>Seu carrinho</h1>
          <div className="produtoContainer">
          {
            !this.state.produtos ? <div className="emptyCart">
                 <h1 className="cartEmpty">Seu Carrinho está vazio<br />Compre Produtos<Link to="/produtos" style={{textDecoration: 'none',color:'#FA8072'}}><code> Aqui</code></Link></h1>
                
            </div> : 
            this.state.doneLoading ? 
            this.state.Itemscarrinho.map(prod => {

                // let val = [prod.precoProduto];
                // val.push("mundo");

                // console.log(val)
                return(
                    <div key={prod._id} className="actualProd">
                        <div className="titleEPreco">
                            <img src={prod.imagemProduto} alt="scrProd" height="70px" width="70px" style={{borderRadius: "30%"}}/>
                            <h1>{prod.nomeProduto}</h1>
                            <input type="number" 
                            placeholder="Quantidade" 
                            value={this.state[prod._id] <= 1 ? 1 : this.state[prod._id]} 
                            name={prod.nomeProduto} 
                            onChange={(e) => this.setState({ [prod._id]: e.target.value })}/><br />
                        </div>
                        <div className="precoFinal">
                            <p><code>Valor Final: </code></p>
                            <p>R${this.state[prod._id] === undefined ?  prod.precoProduto.toFixed(2) : (prod.precoProduto * this.state[prod._id])}</p>
                            {/* { this.state.valorFinal.push(this.state[prod._id] === undefined ?  prod.precoProduto : prod.precoProduto * this.state[prod._id]) } */}
                        </div>
                </div>
                )
            })

            :

            <Spinner color="dark"></Spinner>
        }
          </div>
      </div>
        {
            this.state.produtos ?
    <div>
        <h1 style={{textAlign: 'center'}} className="introCEP">Insira <code>suas</code><br />Informações abaixo</h1>
        <div className="enterCEP">
            <div className="infosCEP">
                <input type="text" value={this.state.cepValue} placeholder="Digite o CEP" onChange={this.saveCEP}/>
                <button onClick={this.fetchCEP}>Pronto</button>
                <div className="displayCEPInfo">
                    {
                        this.state.cepLoaded ? 

                        <div className="seila">
                            <h2><code>Frete para: </code>{this.state.cepInfo.cep}</h2>
                            <h2><code>Valor: </code>R${
                                this.state.cepInfo.uf === 'SP' ? 10 :
                                this.state.cepInfo.uf === 'RJ' ? 15 :
                                this.state.cepInfo.uf === 'NT' ? 20 :
                                this.state.cepInfo.uf === 'AM' ? 30 :
                                this.state.cepInfo.uf === 'MA' ? 45 :

                                25

                            },00</h2>
                            <h2><code>Endereço: </code>{`${this.state.cepInfo.logradouro} ,${this.state.cepInfo.bairro}, ${this.state.cepInfo.localidade} - ${this.state.cepInfo.uf}`}</h2>
                        </div>

                        : ''
                    }
                </div>
            </div>
            <Button color="success"
            style={this.state.cepLoaded ? {display: 'block', textAlign: 'center'} : {display: 'none'}}
            onClick={(this.changeState)}
            >Finalizar Compra</Button>
            {this.state.modalOpen ? <Modal frete={
                this.state.cepInfo.uf === 'SP' ? 10 :
                this.state.cepInfo.uf === 'RJ' ? 15 :
                this.state.cepInfo.uf === 'NT' ? 20 :
                this.state.cepInfo.uf === 'AM' ? 30 :
                this.state.cepInfo.uf === 'MA' ? 45 
                : 25} preco={
                    this.state.Itemscarrinho.map(prod => (
                        <div key={prod._id}>
                            <h1>{prod.precoProduto}</h1>
                        </div>
                    ))

                }/> : ''}
        </div> 
    </div> : ''
        }
        <div className="centerDivCarrinho">
            <div className="showFormasPagamento">
            </div>
            <div className="showInfoCarrinho">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo iusto nisi similique, aliquid reprehenderit est earum dicta, optio consequatur natus ipsa doloremque quasi id esse, vitae doloribus! Quo, odio quasi vero vel molestias dolorem voluptates. Minima itaque hic quia architecto.</p>
            </div>    
        </div>
    </div>
      <Footer />
    </div>
    )
  }

}


const mapStateToProps = store => ({
    produtosParaCarrinho: store.prod.produtos,
})

export default connect(mapStateToProps, null)(Carrinho);
