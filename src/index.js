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
import { NewArticle } from './components/Article/NewArticle';
import { AdminPage } from './components/Admin/AdminPage';
// import { CreateArticle } from './components/Article/CreateArticle';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
  <AuthContextProvider>
  <Router>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/articles' element={<Articles />}/>
      <Route path='/articles/:id' element={<ArticleDetails />}/>
      <Route path='/new-article' element={<NewArticle />}/>
      <Route path='/admin/*' element={<AdminPage />}/>
      {/* <Route path='/client/' element={<ScientistsList />}/> */}
    </Routes>
  </Router>
  </AuthContextProvider>
  <ReactQueryDevtools />
  </QueryClientProvider>
);