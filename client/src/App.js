import React from 'react';
import Main from "./registor/Main";
import Login from "./registor/Login";
import Registor from "./registor/Registor";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import "./App.css"


function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registor" element={<Registor />} />

    </Routes>
  </BrowserRouter>
  );
}

export default App;