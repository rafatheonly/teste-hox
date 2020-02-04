import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Conecta from '../constants/Conecta'
import Item from '../constants/Item'

export default class Produtos extends Component {

    state = {
        produtos: []
    }

    async componentDidMount() {
        const lista = await Conecta.get('/produtos')
        this.setState({ produtos: lista.data })
    }

    render() {
        return (
            <div className="row spacing">
                <div className="col s6">
                    <h4><strong>PRODUTOS</strong></h4>
                </div>
                <div className="col s6 right-align btn-criar">
                    <Link to="/produto" className="btn waves-effect waves-light button-space">NOVO PRODUTO</Link>
                </div>
                <div className="col s12">
                    <table className="responsive-table tbl">
                        <thead>
                            <tr>
                                <th className="center-align grey-text">ID</th>
                                <th className="grey-text">PRODUTO</th>
                                <th className="center-align grey-text">FABRICAÇÃO</th>
                                <th className="center-align grey-text">PERECÍVEL</th>
                                <th className="center-align grey-text">VALIDADE</th>
                                <th className="grey-text">PREÇO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.produtos.map(produto => (
                                <Item key={produto.id}
                                    id={produto.id}
                                    nome={produto.nome}
                                    fabricacao={produto.fabricacao}
                                    perecivel={produto.perecivel}
                                    validade={produto.validade}
                                    preco={produto.preco}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col s12 right-align btn-voltar">
                    <Link to="/" className="btn waves-effect waves-light button-space">VOLTAR</Link>
                </div>
            </div>
        )
    }
}
