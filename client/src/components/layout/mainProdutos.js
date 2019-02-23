import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Spinner, Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,Button} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { categorias } from '../../assets/categorias';
import { FaShoppingCart } from 'react-icons/fa';
import {IconContext} from'react-icons';
// import Carrinho from './Carrinho';
import { bindActionCreators } from 'redux';
import { getCart } from '../../store/actions/actions';
import Footer from './Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class mainProdutos extends Component {

  constructor(props){
    super(props);

    this.state = {
      produtos: [],
      dropdownOpen: false,
      dropdownOpen2: false,
      dropdownOpen3: false,
      valueCategoria: 'Categoria',
      totalNoCarrinho: 0,
      originalContent: [],
      isReady: false,
      itemsAdicionado: [],
      isBlocked: false,
      isAdd: false,
    }
  }

  notify = (item) => {
    toast('Adicionando', {autoClose: 100});

    toast.success(`${item} adicionado ao carrinho`, {
      position:toast.POSITION.BOTTOM_LEFT,
      autoClose: 1500
    });
  };

  toggleDrop = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }

  toggleDrop2 = () => {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2,
    })
  }

  toggleDrop3 = () => {
    this.setState({
      dropdownOpen3: !this.state.dropdownOpen3,
    })
  }

  componentDidMount = () => {
    axios.get('/api/produtos/all')
      .then(res => {
        this.setState({ produtos: res.data, isReady: !this.state.isReady, originalContent: res.data})
      })
      .catch(err => console.log(err))
  }

  changeValue = e => {
    this.setState({
      valueCategoria: e.currentTarget.textContent
    })

    let filteredArray = this.state.produtos.filter(produtos => produtos.categoriaProduto === e.currentTarget.textContent);

    this.setState({
      produtos: filteredArray,
      isBlocked: !this.state.isBlocked
    })

    if(e.currentTarget.textContent === "Todos"){
      this.setState({
        produtos: this.state.originalContent,
      })
    }
  }

  saveToCart = (e) => {
    let newItem = [...this.state.itemsAdicionado, e.target.id];
    this.setState(prevState => ({
      totalNoCarrinho: prevState.totalNoCarrinho + 1,
      itemsAdicionado: newItem,
      isAdd: true,
    }))

    this.props.getCart(newItem);
    this.notify(e.target.name)
  }

  render() {
    return (
      <React.Fragment>
        <div className="mainProdutos">
          <header className="mainProdutosHeader">
            <div className="rightSideHeader">
              <Link to="/" style={{textDecoration: 'none', color:"#333"}}><h2 className="eeae">Revenue<br />store</h2></Link>
            </div>
            <div className="leftSideHeader">
              <h1>Bem Vindo(a) ao <br />Futuro</h1>
              <p>Mais de <br /><code><span className="totalProdutos">{this.state.originalContent.length}</span><br/> produtos a venda</code></p>
              <div className="showCarrinho">
              <IconContext.Provider value={{ size: "2em" ,color: "black"}}>
                <div>
                  <Link to="/cart" style={{textDecoration: 'none', color: '#333',position: 'fixed', top: '2%', right: '2%'}}><FaShoppingCart /><span>({this.state.totalNoCarrinho})</span></Link>
                </div>
              </IconContext.Provider>
              </div>
            </div>
          </header>
          <div className="beforeProducts">
            <div className="centerPromo">
              <h1>Promoção</h1>
            </div>
            <div className="mostSelled">
              <div className="leftSideMostSelled">
                <h1>Moda</h1>
              </div>
              <div className="rightSideMostSelled">
                <h1>Tecnologia</h1>
              </div>
            </div>
          </div>
          <div className="showFilterButton">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDrop}>
              <DropdownToggle caret color="dark">
                Categoria
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Categorias</DropdownItem>
                {
                  categorias.map(item => (
                    <DropdownItem key={item.id} onClick={this.changeValue} disabled={item.nome === "Todos" ? !this.state.isBlocked : this.state.isBlocked }>
                      {item.nome} 
                    </DropdownItem>
                  ))
                }
              </DropdownMenu>
            </Dropdown>
            <Dropdown group isOpen={this.state.dropdownOpen2} toggle={this.toggleDrop2}>
              <DropdownToggle caret color="dark">
                Preço
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header>Preço</DropdownItem>
                <DropdownItem disabled={true}>Não Disponivel</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown group isOpen={this.state.dropdownOpen3} toggle={this.toggleDrop3}>
              <DropdownToggle caret color="dark">
                Fabricantes
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header>Fabricantes</DropdownItem>
                <DropdownItem disabled={true}>Não Disponivel</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>


          <div className="displayContent">
              {
                this.state.isReady ? 
                  this.state.produtos.map(produtos => (
                    <div key={produtos._id} className="caixaDosProdutos">
                      <img src={produtos.imagemProduto} alt="produto" height="200px" width="auto"/>
                      <div className="titleAndPrice">
                        <h1>{produtos.nomeProduto}</h1>
                        <p>R${parseFloat(produtos.precoProduto).toFixed(2)}</p><code>{produtos.quantidadeEmEstoque <= 5 ? `Corra ! Apenas ${produtos.quantidadeEmEstoque} ` : produtos.quantidadeEmEstoque} unidades disponiveis</code>
                      </div>
                      <div className="buyButton">
                        <Button color="success" onClick={this.saveToCart} id={produtos._id} name={produtos.nomeProduto}>Adicionar ao carrinho</Button>
                        <Button><Link style={{textDecoration: "none", color: "#fff"}} to={`/info/${produtos._id}`}>Mais Informações</Link></Button>
                      </div>
                    </div>
                  ))
                : <div style={{margin: "auto"}}>
                    <Spinner color="dark" />
                  </div>
              }
          </div>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({getCart}, dispatch)

export default connect(null, mapDispatchToProps)(mainProdutos);
