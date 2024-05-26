// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LoginForm from './component/LoginForm.jsx'
import RegistrationForm from './component/RegistrationForm.jsx'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './component/Home.jsx'
import Expense from './component/Expense.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<LoginForm/>}/>
    <Route path="/register" element={<RegistrationForm/>}/>
    <Route path="/Expense/:id" element={<Expense/>}/>
  </Routes>
</BrowserRouter> 
)
