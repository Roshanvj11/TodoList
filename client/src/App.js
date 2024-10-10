import React from 'react';
import Main from "./registor/Main";
import Login from "./registor/Login";
import Registor from "./registor/Registor";
import Layout from './pages/Layout';
import Today from './pages/Today';
import Pending from './pages/Pending';
import Scheduled from "./pages/Scheduled"



// #endregion 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import "./App.css"


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/TodoList" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registor" element={<Registor />} />

        {/* Default route redirects to home */}
        <Route path="/" element={<Navigate to="/today" />} />

        <Route path="/" element={<Layout />}>
          <Route path="/today" element={<Today />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/scheduled" element={<Scheduled />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;