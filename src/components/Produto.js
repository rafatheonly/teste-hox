import React, { Component } from 'react'
import M from 'materialize-css'
import Conecta from '../constants/Conecta'


export default class Produto extends Component {

  state = {
    nome: '',
    fabricacao: '',
    perecivel: true,
    validade: '',
    preco: 0,
    erroNome: false,
    erroFabricacao: false,
    erroPerecivel: false,
    erroValidade: false,
    erroPreco: false,
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount() {
    this.initialState = this.state
  }

  limpar = () => {
    this.setState(this.initialState)
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    let validations = true;

    const novo = {
      nome: this.state.name,
      fabricacao: this.state.fabricacao,
      perecivel: this.state.perecivel,
      validade: this.state.validade,
      preco: this.state.preco
    }

    //ALGUMAS VALIDACOES, PODERIAM TER AQUI OUTRAS VALIDACOES, BEM COMO O TAMANHO MINIMO/MAXIMO DO NOME!
    if (novo.nome === '') {
      this.setState({ erroNome: true })
      validations = false
    } else {
      this.setState({ erroNome: false })
      validations = true
    } if (novo.fabricacao === '') {
      this.setState({ erroFabricacao: true })
      validations = false
    } else {
      this.setState({ erroFabricacao: false })
      validations = true
    } if (novo.perecivel === '') {
      this.setState({ erroPerecivel: true })
      validations = false
    } else {
      this.setState({ erroPerecivel: false })
      validations = true
    } if (novo.validade === '') {
      this.setState({ erroValidade: true })
      validations = false
    } else {
      this.setState({ erroValidade: false })
      validations = true
    } if (novo.preco === '') {
      this.setState({ erroPreco: true })
      validations = false
    } else {
      this.setState({ erroPreco: false })
      validations = true
    }

    //VERIFICA SE TODOS OS CAMPOS ESTAO PREENCHIDOS/CORRETOS DEPENDENDO DAS VALIDACOES APLICADAS!
    if (validations === false) {
      return
    }

    //EXECUTA O INSERT NO ARQUIVO db.json
    try {
      const produto = await Conecta.post('/produtos', novo)
      this.limpar()
      M.toast({ html: `Produto ${produto.data.nome} cadastrado com sucesso!` })
    } catch (erro) {
      alert('Ops! Algo deu errado: ' + erro)
    }
  }

  render() {
    return (
      <div className="row spacing">
        <div className="col s12">
          <div className="card-panel">
            <h5 className="grey-text"><strong>CRIAR NOVO PRODUTO</strong></h5>
            <form className="panel-user" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <input id="nome" name="nome" type="text" className={this.state.erroNome ? "error-input" : ''}
                    onChange={this.handleChange} value={this.state.nome} />
                  <label htmlFor="nome" className={this.state.erroNome ? "red-text" : ''}>Nome do produto</label>
                  {this.state.erroNome ? <span className="helper-text red-text">O nome do produto não pode ser vazio!</span> : ''}
                </div>
                <div className="input-field col s12">
                  <input id="fabricacao" name="fabricacao" type="text" className={this.state.erroFabricacao ? "error-input" : ''}
                    onChange={this.handleChange} value={this.state.fabricacao} />
                  <label htmlFor="fabricacao" className={this.state.erroFabricacao ? "red-text" : ''}>Data de fabricação</label>
                  {this.state.erroFabricacao ? <span className="helper-text red-text">A d. de fabricação não pode ser vazia!</span> : ''}
                </div>
                <div className="input-field col s12">
                  <input id="perecivel" name="perecivel" type="text" className={this.state.erroPerecivel ? "error-input" : ''}
                    onChange={this.handleChange} value={this.state.perecivel} />
                  <label htmlFor="perecivel" className={this.state.erroPerecivel ? "red-text" : ''}>Perecível</label>
                  {this.state.erroPerecivel ? <span className="helper-text red-text">O campo perecível não pode ser vazio!</span> : ''}
                </div>
                <div className="input-field col s12">
                  <input id="validade" name="validade" type="text" className={this.state.erroValidade ? "error-input" : ''}
                    onChange={this.handleChange} value={this.state.validade} />
                  <label htmlFor="validade" className={this.state.erroValidade ? "red-text" : ''}>Data de validade</label>
                  {this.state.erroValidade ? <span className="helper-text red-text">A d. de validade não pode ser vazia!</span> : ''}
                </div>
                <div className="input-field col s12">
                  <input id="preco" name="preco" type="text" className={this.state.erroPreco ? "error-input" : ''}
                    onChange={this.handleChange} value={this.state.preco} />
                  <label htmlFor="preco" className={this.state.erroPreco ? "red-text" : ''}>Preço do produto</label>
                  {this.state.erroPreco ? <span className="helper-text red-text">O preço do produto não pode ser vazio!</span> : ''}
                </div>
                <div className="input-field col s12">
                  <button type="submit" className="btn waves-effect waves-light col s12">ENVIAR</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col s12">
          
        </div>
      </div>
    )
  }
}
