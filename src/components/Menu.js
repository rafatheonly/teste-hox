import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class CabMenu extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper black">
                    <Link to={'/'}><img src="logo-white.png" alt="Logo" className="logo" /></Link>
                </div>
            </nav>
        )
    }
}
