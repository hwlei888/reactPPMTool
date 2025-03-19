import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Layout/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import AddProject from './components/Project/AddProject';
import UpdateProject from './components/Project/UpdateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTask from './components/ProjectBoard/ProjectTasks/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTasks/UpdateProjectTask';
import Landing from './components/Layout/Landing';
import Register from './components/UserManagement/Register';
import Login from './components/UserManagement/Login';
import { jwtDecode } from 'jwt-decode';
import setJWTToken from './securityUtils/setJWTToken';
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/securityActions';

const jwtToken = localStorage.jwtToken;

if(jwtToken){
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwtDecode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if(decoded_jwtToken.exp < currentTime){
    //handle logout
    store.dispatch(logout());
    window.location.href = "/";
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              {
                //Public Routes
              }
              
              <Route path='/' element={<Landing />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />

              {
                //Private Routes
              }
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/addProject" element={<AddProject />}/>
              <Route path='/updateProject/:id' element={<UpdateProject />}/>
              <Route path='/projectBoard/:id' element={<ProjectBoard />}/>
              <Route path='/addProjectTask/:id' element={<AddProjectTask />}/>
              <Route path='/updateProjectTask/:backlog_id/:pt_id' element={<UpdateProjectTask />}/>
            </Routes>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;



