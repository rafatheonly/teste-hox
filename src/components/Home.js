import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
    <div className="card-panel panel-login">
        <h5 className="center-align"><strong>LOGIN HOX</strong></h5>
        <form className="login-form">
            <div className="row">
                <div className="input-field col s12">
                    <input id="email" type="email" />
                    <label htmlFor="email">Login</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input id="password" type="password" />
                    <label htmlFor="password">Senha</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <Link to="/produtos" className="btn waves-effect waves-light col s12">ENTRAR</Link>
                </div>
            </div>
        </form>
    </div>
)

export default Home;
