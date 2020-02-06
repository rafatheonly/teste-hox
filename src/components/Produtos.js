import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css'
import Conecta from '../constants/Conecta'
import Item from '../constants/Item'

export default class Produtos extends Component {

    state = {
        produtos: [],
        url: '/produtos?_page=',
        page: 1

    }

    async componentDidMount() {
        console.log('um: ' + this.state.page)
        const lista = await Conecta.get(this.state.url + this.state.page)
        this.setState({ produtos: lista.data })
    }

    excluir = async (id) => {
        try {
            await Conecta.delete(`/produtos/${id}`)
            this.setState({
                produtos: this.state.produtos.filter(produto => produto.id !== id)
            })
            M.toast({ html: `Produto excluído com sucesso!` })
        } catch (erro) {
            alert('Ops! Algo deu errado: ' + erro)
        }
    }
    
    paginacao = (action) => {
        if (action === 'anterior') {
            //_page - 1
            //console.log(1)
            this.setState({page: this.state.page - 1})
        } else {
            //_page + 1
            //console.log(2)
            this.setState({page: this.state.page + 1})
            console.log(this.state.page)
        }
    }

    render() {
        return (
            <div className="row spacing">
                <div className="col s6">
                    <h4 id="titulo-produtos"><strong>PRODUTOS</strong></h4>
                </div>
                <div className="col s6 right-align btn-criar">
                    <Link to="/produto" className="btn waves-effect waves-light button-space">NOVO</Link>
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
                                <th className="right-align grey-text">PREÇO</th>
                                <th className="center-align grey-text">AÇÕES</th>
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
                                    excluir={this.excluir}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col s12" id="paginacao">
                    <button
                        type="button"
                        className="btn waves-effect waves-light"
                        onClick={() => {this.paginacao('anterior')}}>ANTERIOR</button>
                    <button
                        type="button"
                        className="btn waves-effect waves-light"
                        onClick={() => {this.paginacao('proxima')}}>PRÓXIMA</button>
                </div>
                <div className="col s12 right-align btn-voltar">
                    <Link to="/" className="btn waves-effect waves-light button-space">VOLTAR</Link>
                </div>
            </div>
        )
    }
}
