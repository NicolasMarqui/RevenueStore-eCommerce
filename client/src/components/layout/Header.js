import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import L from 'leaflet';
import { Map, TileLayer ,Marker, Popup} from 'react-leaflet';
import { connect } from 'react-redux';
import menu from '../Imagens/images.png';
import Footer from './Footer';

const myIcon = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII',
    iconSize: [25, 41]
  });

class Header extends Component {
    constructor(props){
        super(props);

        this.state = {
            openNav: false,
            produtos: [],
            totalProd: [],
            done: true,
            lat: -23.088,
            lng: -47.211,
            zoom: 15,
        }
    }

    componentDidMount = () => {
        axios.get('/api/produtos/all')
            .then(res => this.setState({ produtos: res.data }))
            .catch(err => console.log(err));
    }
  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <div className="mainHeader" style={this.state.openNav ? {overflow: 'hidden'} : null}>
        <div className="fullNav" style={this.state.openNav ? {display: 'block'} : {display: 'none'}}>
            <div className="closeBtn">
                <button onClick={() => this.setState({openNav: !this.state.openNav})}>X</button>
            </div>
        <div className="centerFullNav">
            <ul>
                <li><a href="/">Home</a></li>
                <Link to="/produtos" style={{textDecoration: 'none'}}><li><span >Produtos</span></li></Link>
                <Link to="/cart" style={{textDecoration: 'none'}}><li><span >Carrinho</span></li></Link>
                {
                    this.props.auth.isAutenticado ? <Link to="/minhaConta" style={{textDecoration: 'none'}}><li><span >Minha Conta</span></li></Link> : <Link to="/login" style={{textDecoration: 'none'}}><li><span >Login</span></li></Link>
                }
            </ul>
        </div>
      </div>
        <div className="mainNav">
            <div className="navbarBrand">
                <h2>Revenue<br />store</h2>
            </div>
            <div className="menuOrLinks">
                <img src={menu} alt="menu" height="80px" width="80px" style={{cursor: "pointer"}} onClick={() => this.setState({ openNav: !this.state.openNav })}/>
            </div>
        </div>
        <div className="centerDiv">
            <div className="comprarProdutos">
                <h1>R.</h1>
            </div>
            <div className="maisVendidos">
                <h1>S.</h1>
            </div>    
        </div>
        <div className="dividerInfo">
            <h1>A mais importante loja do <code>Brasil</code></h1>
            <p>Mais de <br /><span>{
                this.state.produtos.forEach(el => {
                    this.state.totalProd.push(el.quantidadeEmEstoque)
                })

            } 
            {
                this.state.done ? this.state.totalProd.reduce((a,b) => a + b, 0) : 0
            }
            </span>
            <br />
            Produtos em Estoque</p>
        </div>
        <div className="showAboutProducts">
            <div className="leftSide item">
            </div>
            <div className="rightSide item">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum, voluptatibus. Corporis dolore soluta fugit, adipisci autem quaerat in quia saepe deserunt culpa reprehenderit voluptatem, sunt voluptas quisquam velit aliquid nulla.</p>
            </div>
        </div>
        <div className="moda">
            <div className="modaFeminina">
                <h1><strong>MODA</strong><br />Feminina</h1>
            </div>
            <div className="modaMasculina">
                <h1><strong>MODA</strong><br />Masculina</h1>
            </div>
        </div>
        <div className="displayTec">
            <div className="rightSideTec">
            </div>
            <div className="leftSideTec">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi praesentium quam, ab accusantium nemo, ex impedit sunt deserunt minus iste possimus? Cum expedita optio nihil ipsum? Fuga quaerat sit corporis alias culpa, nulla quidem ex! Consequuntur saepe accusamus sapiente minus!</p>
            </div>
        </div>
        <div className="showMap">
            <h1>Venha até nós</h1>
            <div className="displayMap">
            <Map className="actualMap" center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker icon={myIcon} position={position}>
                <Popup>
                    Rua Onze de Julho, 87 <br/>Indaiatuba, SP
                </Popup>
                </Marker>
            </Map>
            </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = store => ({
    auth: store.userAuth
})


export default connect(mapStateToProps, null)(Header);
