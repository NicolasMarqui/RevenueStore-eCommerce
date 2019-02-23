import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import menu from '../Imagens/images.png';
import { Spinner, Button} from 'reactstrap';
import Footer from './Footer';

export default class Informacoes extends Component {

    constructor(props){
        super(props);

        this.state = {
            currentProduct: [],
            isReady: false,
        }
    }

    componentDidMount = () => {
        axios.get(`/api/produtos/info/${this.props.match.params.id}`)
            .then(res => this.setState({currentProduct: res.data, isReady: !this.state.isReady}))
            .catch(err => console.log(err));
            window.scrollTo(0,0);
    }
  render() {
    return (
      <React.Fragment>
          <div className="mainHeader" style={this.state.openNav ? {overflow: 'hidden',border: '2px'}: null}>
            <div className="fullNav" style={this.state.openNav ? {display: 'block'} : {display: 'none'}}>
                <div className="closeBtn">
                    <button onClick={() => this.setState({openNav: !this.state.openNav})}>X</button>
                </div>
        <div className="centerFullNav">
            <ul>
                <Link to="/"><li><span>Home</span></li></Link>
                <Link to="/produtos" style={{textDecoration: 'none'}}><li><span>Produtos</span></li></Link>
                <li><a href="/">Info</a></li>
                <li><a href="/">Minha Conta</a></li>
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
        <div className="showInfo">
            <div className="childInfo">
            {
                this.state.isReady ? this.state.currentProduct.map(prod => (
                    <div key={prod._id}>
                        <div className="imagemSeparada">
                            <img src={prod.imagemProduto} alt="produto" height="150px" width="auto"/>
                        </div>
                        <div className="infosInfo">
                            <h1>{prod.nomeProduto}</h1>
                            <p>{prod.descricaoProduto}</p>
                        </div>
                        <Button color="success" className="comprarBtn">Comprar</Button>
                    </div>
                ))
                :
                <Spinner color="dark"></Spinner>
            }
            </div>

        </div>
    </div>
    <Footer />
      </React.Fragment>
    )
  }
}
