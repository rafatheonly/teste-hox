import React from 'react'
import { Link } from 'react-router-dom'

const Item = props => {
    return (
        <tr>
            <td className="center-align"><Link to={`/detalhes/${props.id}`}>{props.id}</Link></td>
            <td>{props.nome}</td>
            <td className="center-align">{props.fabricacao}</td>
            <td className="center-align">{props.perecivel ? "SIM" : "NÃO"}</td>
            <td className="center-align">{props.validade}</td>
            <td className="right-align">{(props.preco).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
            <td className="center-align">
                <Link to={`/editar/${props.id}`}><i className="far fa-edit"></i></Link>&nbsp;&nbsp;
                <a href="javascript:void(0);" onClick={(e) => window.confirm(`Confirma a exclusão do produto ${props.nome}?`)
                    && props.excluir(props.id, e)}><i className="far fa-trash-alt"></i></a>
            </td>
        </tr>
    )
}

export default Item