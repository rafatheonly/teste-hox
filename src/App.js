import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Menu from './components/Menu'
//import Home from './components/Home'
//import Users from './components/Users'
//import Detalhes from './components/Detalhes'
//import User from './components/User'

function App() {
  return (
    <Router>
      <Menu />      
    </Router>
  );
}

export default App;
