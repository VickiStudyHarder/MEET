import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignUp from './components/pages/auth/SignUpPage';
import Login from './components/pages/auth/Login';
import {Account} from './components/pages/auth/Account';
import Status from './components/pages/auth/Status';
import Home from './components/pages/Home';

function App() {
  return (
    <Router> 
      <div>
      <Account>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        </Account>
      </div>
    </Router>
  );
}

export default App;
