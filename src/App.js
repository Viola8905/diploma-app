import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pages from "./router/Pages";
import { BrowserRouter as Router} from "react-router-dom";
import './App.css';


function App() {
  return (
    <div className="App">
    <Router>
      <Pages />
    </Router>
   
  </div>
  );
}

export default App;
