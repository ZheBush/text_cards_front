import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './login/Login';
import Home from './Home'
import Cards from './cards/Cards';
import Results from './results/Results';
import Register from './register/Register';
import History from './history/History'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider value = {defaultSystem}>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Home user = {null}/>}/>
          <Route path = '/results' element = {<Results/>}/>
          <Route path = '/cards' element = {<Cards/>}/>
          <Route path = '/login' element = {<Login/>}/>
          <Route path = '/register' element = {<Register/>}/> 
          <Route path = '/history' element = {<History/>}/> 
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
