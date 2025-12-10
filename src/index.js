import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Auth from './Auth';
import Home from './Home'
import Cards from './Cards';
import Results from './Results';
import Register from './Register';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider value = {defaultSystem}>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Results/>}/>
          {/* <Route path = '/' element = {<Cards/>}/> */}
          {/* <Route path = '/' element = {<Home/>}/> */}
          {/* <Route path = '/' element = {<Auth/>}/> */}
          {/* <Route path = '/register' element = {<Register/>}/>  */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
