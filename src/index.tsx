import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './login/Login.tsx';
import Home from './home/Home.tsx';
import Cards from './cards/Cards.tsx';
import Register from './register/Register.tsx';
import History from './history/History.tsx';
import Groups from './groups/Groups.tsx';
import GroupCards from './groups/GroupCards.tsx';
import Layout from './Layout.tsx';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="cards" element={<Cards />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="history" element={<History />} />
              <Route path="groups" element={<Groups />} />
              <Route path="group-cards" element={<GroupCards />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);