import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Auth from './Auth';
import Register from './register/Register';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider value = {defaultSystem}>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Auth/>}/>
          <Route path = '/register' element = {<Register/>}/>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
