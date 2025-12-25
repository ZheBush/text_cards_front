import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './login/Login';
import Home from './home/Home';
import Cards from './cards/Cards';
import Register from './register/Register';
import History from './history/History';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);