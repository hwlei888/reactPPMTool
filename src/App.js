import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Layout/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProject from './components/Project/AddProject';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/dashboard" element={<Dashboard />}/>
            <Route exact path="/addProject" element={<AddProject />}/>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
