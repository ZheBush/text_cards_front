import React from 'react';
import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import GroupCards from './groups/GroupCards.tsx';
import { ChakraProvider, defaultSystem, Flex, Spinner } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext.tsx';
import { HelmetProvider } from 'react-helmet-async';


const Home = lazy(() => import('./home/Home.tsx'));
const Cards = lazy(() => import('./cards/Cards.tsx'));
const History = lazy(() => import('./history/History.tsx'));
const Login = lazy(() => import('./login/Login.tsx'));
const Register = lazy(() => import('./register/Register.tsx'));
const Groups = lazy(() => import('./groups/Groups.tsx'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ChakraProvider value={defaultSystem}>
      <AuthProvider>
        <BrowserRouter>
        <Suspense fallback={
          <Flex h="100vh" alignItems="center" justifyContent="center">
            <Spinner size="xl" color="rgb(4,120,87)" />
          </Flex>
          }>
            <Routes>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="/cards/:id" element={<Cards />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="history" element={<History />} />
              <Route path="groups" element={<Groups />} />
              <Route path="group-cards" element={<GroupCards />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
    </HelmetProvider>
  </React.StrictMode>
);