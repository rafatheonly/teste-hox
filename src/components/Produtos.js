import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css'
import Conecta from '../constants/Conecta'
import Item from '../constants/Item'

export default class Produtos extends Component {

    state = {
        produtos: [],
        page: 1,
        totalProdutos: 0,
        idAsc: '',
        idDesc: '',
        prodAsc: '',
        prodDesc: '',
        btnProximo: false
    }

    async componentDidMount() {
        const produtos = await Conecta.get('/produtos')
        this.setState({ totalProdutos: produtos.data.length })
        this.loadProdutos(this.state.page, '')
        M.AutoInit()
    }

    loadProdutos = async (page, filter) => {
        const produtos = await Conecta.get(`/produtos?_page=${page}${filter}`)
        this.setState({ produtos: produtos.data })
        if (filter === '' || filter === '&_sort=id&_order=asc') {
            this.setState({ idAsc: 'ativo', idDesc: '', prodAsc: '', prodDesc: '' })
        }
        if (filter === '&_sort=id&_order=desc') {
            this.setState({ idAsc: '', idDesc: 'ativo', prodAsc: '', prodDesc: '' })
        }
        if (filter === '&_sort=nome&_order=asc') {
            this.setState({ idAsc: '', idDesc: '', prodAsc: 'ativo', prodDesc: '' })
        }
        if (filter === '&_sort=nome&_order=desc') {
            this.setState({ idAsc: '', idDesc: '', prodAsc: '', prodDesc: 'ativo' })
        }
        const proximos = await Conecta.get(`/produtos?_page=${page + 1}${filter}`)
        proximos.data.length === 0 ? this.setState({ btnProximo: true }) : this.setState({ btnProximo: false })
    }

    excluir = async (id) => {
        try {
            await Conecta.delete(`/produtos/${id}`)
            this.setState({ produtos: this.state.produtos.filter(produto => produto.id !== id) })
            this.setState({page: 1})
            this.componentDidMount()
            M.toast({ html: `Produto excluído com sucesso!` })
        } catch (erro) {
            alert('Ops! Algo deu errado: ' + erro)
        }
    }

    paginacao = (acao) => {
        if (acao === 'anterior') {
            this.loadProdutos(this.state.page - 1)
            this.setState({ page: this.state.page - 1, idAsc: 'ativo', idDesc: '', prodAsc: '', prodDesc: '' })
        } else {
            this.loadProdutos(this.state.page + 1)
            this.setState({ page: this.state.page + 1, idAsc: 'ativo', idDesc: '', prodAsc: '', prodDesc: '' })
        }
    }

    render() {
        return (
            <div className="row spacing">
                <div className="col s12">
                    <h4 id="titulo-produtos"><strong>PRODUTOS ({this.state.totalProdutos})</strong></h4>
                </div>
                <div className="col s12 right-align botoes">
                    <Link to="#" className="btn waves-effect waves-light dropdown-trigger"
                        data-target="dropdown1">ORDENAR</Link>&nbsp;
                    <ul id='dropdown1' className='dropdown-content'>
                        <li>
                            <Link
                                to="#" className={this.state.idAsc}
                                onClick={() => { this.loadProdutos(this.state.page, '&_sort=id&_order=asc') }}>
                                <span>ID &darr;</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className={this.state.idDesc}
                                onClick={() => { this.loadProdutos(this.state.page, '&_sort=id&_order=desc') }}>
                                <span>ID &uarr;</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className={this.state.prodAsc}
                                onClick={() => { this.loadProdutos(this.state.page, '&_sort=nome&_order=asc') }}>
                                <span>PROD. &darr;</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className={this.state.prodDesc}
                                onClick={() => { this.loadProdutos(this.state.page, '&_sort=nome&_order=desc') }}>
                                <span>PROD. &uarr;</span>
                            </Link>
                        </li>
                    </ul>
                    <Link to="/produto" className="btn waves-effect waves-light">NOVO</Link>&nbsp;
                    <Link to="/" className="btn waves-effect waves-light">VOLTAR</Link>
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
                        onClick={() => { this.paginacao('anterior') }}
                        disabled={this.state.page < 2}>ANTERIOR</button>
                    <button
                        type="button"
                        className="btn waves-effect waves-light"
                        onClick={() => { this.paginacao('proxima') }}
                        disabled={this.state.btnProximo}>PRÓXIMA</button>
                </div>
            </div>
        )
    }
}
