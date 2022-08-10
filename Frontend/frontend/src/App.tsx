import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Agenda,
  Calendar,
  Group,
  Notes,
  Rating,
  Recording,
  ToDos,
  Home,
  Login,
  SignUp,
  LandingPage,
} from "./components/pages";
import GoogleAuth from "./components/organisms/Google/Google";
import ProtectedRoute from "./hooks/ProtectedRoute";
import API from "./components/pages/API";
import { AppContextProvider } from "./contexts/AppContext";

function App() {
  return (
      <Router>
        <div style={{ height: "100%", width: "100%" }}>
          <AppContextProvider>
            <Routes>
              {/* <Route path='/' element={<ProtectedRoute />}> */}
              <Route path="/home" element={<Home />} />
              {/* </Route> */}
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/group" element={<Group />} />
              <Route path="/todo" element={<ToDos />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/rating" element={<Rating />} />
              <Route path="/recording" element={<Recording />} />
              <Route path="/todos" element={<ToDos />} />
              <Route path="/login1" element={<LandingPage />} />
              <Route path="/api" element={<API />} />
            </Routes>
          </AppContextProvider>
        </div>
      </Router>
  );
}

export default App;
