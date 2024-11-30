import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './Pages/Layout';
import Add from './Pages/Add/Add';
import List from './Pages/List/List';
import Orders from './Pages/Orders/Orders';
import Login from './Pages/Login';
import Register from './Pages/Register';

const url = 'http://localhost:4000'; // Replace with your backend URL

const App = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const isRegistered = localStorage.getItem('isRegistered') === 'true';

  return (
    <Router>
      <div className='App'>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Navigate to={isRegistered ? (isAuthenticated ? '/login' : '/register') : '/admin/add'} />} />
          <Route path='/login' element={<Login url={url} />} />
          <Route path='/register' element={<Register url={url} />} />
          <Route path='/admin/*' element={isAuthenticated ? <Layout /> : <Navigate to='/login' />}>
            <Route path='add' element={<Add url={url} />} />
            <Route path='list' element={<List url={url} />} />
            <Route path='orders' element={<Orders url={url} />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
