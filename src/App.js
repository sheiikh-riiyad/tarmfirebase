import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Console from "./components/Console";
import Service from "./components/Service";
import Contact from "./components/Contact";
import Navebar from "./components/Navebar";
import Login from "./components/Login";
import Regester from "./components/regester";

function App() {
  return (
    <Router>
      <Navebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/console" element={<Console />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regester" element={<Regester />} />
      </Routes>
    </Router>
  );
}

export default App;
