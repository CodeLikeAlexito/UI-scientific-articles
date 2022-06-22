// import NavigationBar from './components/NavigationBar';
// import Login from './components/User/Login';
// import Register from './components/User/Register';
// import { Row, Col, Container } from 'react-bootstrap';
import { useContext } from 'react';
import "./App.scss";
import { HomePage } from './components/Home/HomePage';
import AuthContext from './util/auth-context';
// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// const API_URL = 'http://localhost:7001/book/';

export const App = () => {

  const authCtx = useContext(AuthContext);
  
  return (
    <HomePage />
  );
}

export default App;
