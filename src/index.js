
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Register } from './components/Login';
import { Articles } from './components/Article/Articles';
import { ArticleDetails } from './components/Article/ArticleDetails';
import { AuthContextProvider } from './util/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
  <Router>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/articles' element={<Articles />}/>
      <Route path='/articles/:id' element={<ArticleDetails />}/>
    </Routes>
  </Router>
  </AuthContextProvider>
);