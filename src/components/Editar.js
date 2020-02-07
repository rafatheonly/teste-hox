import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css'
import InputMask from 'react-input-mask'
import Conecta from '../constants/Conecta'
import { Redirect } from 'react-router'

export default class Editar extends Component {

  state = {
    id: 0,
    nome: '',
    fabricacao: '',
    perecivel: false,
    validade: '',
    preco: '',
    erroNome: false,
    erroFabricacao: false,
    erroPerecivel: false,
    erroValidade: false,
    erroPreco: false,
    redirect: false
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const produto = await Conecta.get(`/produtos/${params.id}`)
    let preco = "" + produto.data.preco
    let partesPreco = preco.split(".")
    produto.data.preco = (partesPreco[0] + "," + (partesPreco[1] === undefined ? '00' : partesPreco[1])).toString()
    this.setState(produto.data)
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleChange = e => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({ [e.target.name]: isCheckbox ? e.target.checked : e.target.value })
  }

  validacoes = () => {
    let erroNome = '';
    let erroFabricacao = '';
    let erroValidade = '';
    let erroPreco = '';

    if (!this.state.nome) {
      erroNome = 'O nome não pode ser vazio!'
    }

    if (!this.state.fabricacao) {
      erroFabricacao = 'A data de fabricação não pode ser vazia!'
    }

    if (this.state.perecivel) {
      if (!this.state.validade) {
        erroValidade = 'A data de validade não pode ser vazia!'
      }

      let partesDataFabricacao = this.state.fabricacao.split("/");
      let dataFabricacao = new Date(partesDataFabricacao[2], partesDataFabricacao[1] - 1, partesDataFabricacao[0]);
      let partesDataValidade = this.state.validade.split("/");
      let dataValidade = new Date(partesDataValidade[2], partesDataValidade[1] - 1, partesDataValidade[0])

      if (dataFabricacao > dataValidade) {
        erroValidade = 'A data de validade não pode ser menor que a de fabricação!'
      }
    }

    if (!this.state.preco) {
      erroPreco = 'O preço não pode ser vazio!'
    } else if (this.state.preco.search('^[0-9]+(,[0-9]{1,2})?$')) {
      erroPreco = 'O preço dever ser em reais, ex.: 22,50'
    }

    if (erroNome || erroFabricacao || erroPreco || erroValidade) {
      this.setState({ erroNome, erroFabricacao, erroValidade, erroPreco })
      return false
    }
    return true
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const alterado = {
      nome: this.state.nome,
      fabricacao: this.state.fabricacao,
      perecivel: this.state.perecivel,
      validade: this.state.validade,
      preco: this.state.preco
    }

    //EXECUTA O UPDATE NO ARQUIVO db.json REFERENTE AO PRODUTO A SER ATUALIZADO
    if (this.validacoes()) {
      try {
        alterado.validade = alterado.validade === '' ? '—' : alterado.validade
        alterado.validade = alterado.perecivel === false ? '—' : alterado.validade
        let partesPreco = alterado.preco.split(",");
        alterado.preco = parseFloat(partesPreco[0] + "." + partesPreco[1])
        const produto = await Conecta.put(`/produtos/${this.state.id}`, alterado)
        this.setState({ redirect: true })
        M.toast({ html: `Produto de id ${produto.data.id} alterado com sucesso!` })
      } catch (erro) {
        alert('Ops! Algo deu errado: ' + erro)
      }
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/produtos" />
    }
    else {
      return (
        <div className="row spacing">
          <div className="col s12">
            <div className="card-panel">
              <h5 className="grey-text"><strong>EDITAR PRODUTO</strong></h5>
              <form className="panel-produto" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      className={this.state.erroNome ? "error-input" : ''}
                      onChange={this.handleChange}
                      value={this.state.nome} />
                    <label
                      htmlFor="nome"
                      className={this.state.erroNome ? "red-text" : this.state.nome !== "" ? "active" : ""}>Nome do produto</label>
                    <span className="helper-text red-text">{this.state.erroNome}</span>
                  </div>
                  <div className="input-field col s12">
                    <InputMask
                      id="fabricacao"
                      name="fabricacao"
                      type="text"
                      className={this.state.erroFabricacao ? "error-input" : ''}
                      onChange={this.handleChange}
                      value={this.state.fabricacao}
                      mask="99/99/9999"></InputMask>
                    <label
                      htmlFor="fabricacao"
                      className={this.state.erroFabricacao ? "red-text" : this.state.fabricacao !== "" ? "active" : ""}>Data de fabricação</label>
                    <span className="helper-text red-text">{this.state.erroFabricacao}</span>
                  </div>
                  <div className="input-field col s12">
                    <InputMask
                      id="preco"
                      name="preco"
                      type="text"
                      className={this.state.erroPreco ? "error-input" : ''}
                      onChange={this.handleChange}
                      value={this.state.preco}></InputMask>
                    <label
                      htmlFor="preco"
                      className={this.state.erroPreco ? "red-text" : this.state.preco !== "" ? "active" : ""}>Preço do produto</label>
                    <span className="helper-text red-text">{this.state.erroPreco}</span>
                  </div>
                  {this.state.perecivel ? <div className="input-field col s12">
                    <InputMask
                      id="validade"
                      name="validade"
                      type="text"
                      className={this.state.erroValidade ? "error-input" : ''}
                      onChange={this.handleChange}
                      value={this.state.validade}
                      mask="99/99/9999"></InputMask>
                    <label
                      htmlFor="validade"
                      className={this.state.erroValidade ? "red-text" : this.state.validade !== "" ? "active" : ""}>Data de validade</label>
                    <span className="helper-text red-text">{this.state.erroValidade}</span>
                  </div> : ''}
                  <div className="input-field col s12">
                    <label>
                      <input
                        name="perecivel"
                        type="checkbox"
                        className="filled-in"
                        onChange={this.handleChange}
                        value={this.state.perecivel}
                        checked={this.state.perecivel} />
                      <span>Perecível</span>
                    </label>
                    <br />
                  </div>
                  <div className="input-field col s12">
                    <button
                      type="submit"
                      className="btn waves-effect waves-light col s12">EDITAR</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col s12 right-align">
            <Link to="/produtos" className="btn waves-effect waves-light">VOLTAR</Link>
          </div>
        </div>
      )
    }
  }
}