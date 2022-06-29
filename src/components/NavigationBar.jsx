import React, {useContext} from 'react';

import {Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../util/auth-context';
import {useNavigate} from "react-router-dom"

const NavigationBar = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
        navigate("/");
    };

    return (
        <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Scientific Articles</Navbar.Brand>
                <Nav className="navbar-left">
                    {/* <Link to="/" className='nav-link'>Scientific Articles</Link> */}
                    <Link to="/" className='nav-link'>Home</Link>
                    {/* <Link to="#features" className='nav-link'>Features</Link> */}
                    {isLoggedIn && <Link to="/new-article" className='nav-link'>New article</Link>}
                    {isLoggedIn && <Link to="/articles" className='nav-link'>Articles</Link>}
                    {isLoggedIn && <Link to="/admin" className='nav-link'>Admin</Link>}
                </Nav>
                <Nav className='navbar-right'>
                    {!isLoggedIn && <Link to="/register" className='btn btn-secondary'>Register</Link>}
                    {!isLoggedIn && <Link to="/login" className='btn btn-primary'>Login</Link>}
                    
                    {isLoggedIn && <button onClick={logoutHandler} className='btn btn-primary'>Logout</button>}
                    {isLoggedIn && <span className='text-white bg-dark'>Welcome, {authCtx.username}</span>}
                </Nav>
            </Navbar>
    );
}

export {NavigationBar};