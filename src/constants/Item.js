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
            <td>{(props.preco).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
        </tr>
    )
}

export default Item