import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Conecta from '../constants/Conecta'


export default class Detalhes extends Component {

    state = {
        id: 0,
        nome: '',
        fabricacao: '',
        perecivel: true,
        validade: '',
        preco: 0
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const produto = await Conecta.get(`/produtos/${params.id}`)
        this.setState(produto.data)
    }

    render() {
        return (
            <div className="row spacing">
                <div className="col s12">
                    <div className="card-panel">
                        <h5 className="grey-text"><strong>{this.state.nome}</strong></h5>
                        <p><strong>Data de fabricação:</strong> {this.state.fabricacao}</p>
                        <p><strong>Perecível:</strong> {this.state.perecivel ? "SIM" : "NÂO"}</p>
                        <p><strong>Data de validade:</strong> {this.state.validade}</p>
                        <p><strong>Preço:</strong> {(this.state.preco).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                        <p>
                            <Link to="/produtos" className="btn waves-effect waves-light button-space">VOLTAR</Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
