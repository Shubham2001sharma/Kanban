/* eslint-disable no-unused-vars */
import React from "react";
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import ForgotPassword from "./Components/ForgotPassword";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />


        </Routes>
      </Router>
    </>
  );
}

export default App;
