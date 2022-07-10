import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/pages/auth/SignUp';
import Login from './components/pages/auth/Login';
import { Account } from './contexts/Account';
import { Meeting } from './contexts/Meeting';
import { Video } from './contexts/Video';
import Home from './components/pages/Home';
import VideoContainer from './components/organisms/Video/VideoContainer';
import ProtectedRoute from './hooks/ProtectedRoute';

function App() {
  return (
    <Router>
      <div style={{ height: '100%', width: '100%' }}>
        <Account>
          <Meeting>
            <Video>
              <Routes>
                {/* <Route path='/' element={<ProtectedRoute />}> */}
                <Route path='/home' element={<Home />} />
                {/* </Route> */}
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<Login />} />
                <Route path='/video' element={<VideoContainer />} />
              </Routes>
            </Video>
          </Meeting>
        </Account>
      </div>
    </Router>
  );
}

export default App;
