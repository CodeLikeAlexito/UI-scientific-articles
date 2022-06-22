import React, {useContext} from 'react';

import {Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../util/auth-context';

const NavigationBar = () => {
    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
        //optional: redirect the user
    };

    return (
        <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Scientific Articles</Navbar.Brand>
                <Nav className="navbar-left">
                    {/* <Link to="/" className='nav-link'>Scientific Articles</Link> */}
                    <Link to="#home" className='nav-link'>Home</Link>
                    <Link to="#features" className='nav-link'>Features</Link>
                    {isLoggedIn && <Link to="/articles" className='nav-link'>Articles</Link>}
                </Nav>
                <Nav className='navbar-right'>
                    {!isLoggedIn && <Link to="/register" className='nav-link'>Register</Link>}
                    {!isLoggedIn && <Link to="/login" className='nav-link'>Login</Link>}
                    {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
                </Nav>
            </Navbar>
    );
}

export {NavigationBar};