import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Menu from './components/Menu'
import Home from './components/Home'
import Produtos from './components/Produtos'
import Detalhes from './components/Detalhes'
import Produto from './components/Produto'

function App() {
  return (
    <Router>
      <Menu />      
        <Route path="/" exact component={Home} /> 
        <Route path="/produtos/" component={Produtos} />    
        <Route path="/detalhes/:id" component={Detalhes} />    
        <Route path="/produto" component={Produto} />    
    </Router>
  );
}

export default App;
