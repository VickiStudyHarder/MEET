import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignUp from './components/pages/auth/SignUp';
import Login from './components/pages/auth/Login';
import { Account } from './contexts/Account';
import Home from './components/pages/Home';
import  ProtectedRoute  from  './hooks/ProtectedRoute'

function App() {
  return (
    <Router> 
      <div>
      <Account>
        <Routes>
          <Route path="/" element={<ProtectedRoute />} >
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        </Account>
      </div>
    </Router>
  );
}

export default App;
