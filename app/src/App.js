import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home/home";
import Edit from "./components/Edit/edit";
import Add from "./components/Add/add";

function App() {
  return (
    <div className="App">
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/add" component={Add} />
          <Route path="/products/:id" component={Edit} />
        </Router>
    </div>
  );
}

export default App;
