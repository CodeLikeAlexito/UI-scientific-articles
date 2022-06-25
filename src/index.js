
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
import {NewArticle} from './components/Article/NewArticle';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '../src/components/Article/index.css';
import '../src/components/Article/reportWebVitals.js';

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
      <Route path='/new-article' element={<NewArticle />}/>
    </Routes>
  </Router>
  </AuthContextProvider>
);