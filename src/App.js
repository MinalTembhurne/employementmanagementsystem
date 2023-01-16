// taking API from "https://dummy.restapiexample.com/"


import React from 'react';
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import About from "./Component/About";
import AddUser from './Component/AddUser';
import EditUser from './Component/EditUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <div className='App'>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/user/add" element={<AddUser />} />
            <Route path="/user/edit/:number" element={<EditUser />} />
          </Routes> 
        </div>
      </Router>
    </>
  )
}

export default App;