import React from "react";
import "./App.css";

import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";

import Home from "./E-comm/Home";
import Cart from "./E-comm/Cart";
import Login from "./SignUp/Login";
import SignUp from "./SignUp/SignUp";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
