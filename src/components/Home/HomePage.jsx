import React, {useContext} from 'react';
import {NavigationBar} from '../NavigationBar'
import './homepage.css';
import AuthContext from '../../util/auth-context';

const HomePage = () => {
	const authCtx = useContext(AuthContext);
	const isLoggedIn = authCtx.isLoggedIn;
    return(
        <>
        <div><NavigationBar /></div>
        <div className="container-fluid banner">
		<div className="row">
			{/* <div class="col-md-12">
				<nav class="navbar navbar-md">
					<div class="navbar-brand">SPITAL</div>
					<ul class="nav">
						<li class="nav-item">
							<a class="nav-link" href="#">HOME</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">PORTFOLIO</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">ABOUT</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">CONTACT</a>
						</li>
					</ul>
				</nav>
			</div> */}
			<div className="col-md-8 offset-md-2 info">
				<h1 className="text-center">SCIENTIFIC ARTICLES SEARCH</h1>
				<p className="text-center">
					Find and work with scientific articles fast and easy.
				</p>
				{!isLoggedIn && <a href="/register" className="btn btn-md text-center">GET STARTED</a>}
				{isLoggedIn && <a href="/articles" className="btn btn-md text-center">FIND ARTICLES</a>}
			</div>
		</div>
	</div>
        </>
        
    );
}

export {HomePage};