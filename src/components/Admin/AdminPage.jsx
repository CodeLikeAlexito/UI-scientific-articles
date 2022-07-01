import React from 'react';


import {NavigationBar} from '../NavigationBar';
import { ScientistsComponent } from './ScientistsComponent';
import { ArticlesComponent } from './ArticlesComponent';

const AdminPage = () => {
    return (
        <>
        <NavigationBar />
        <br></br>
        <div className='container'>
            <h1>
                Admin panel
            </h1>
        </div>
        <br></br>
        <ScientistsComponent />
        <br></br>
        <br></br>
        <ArticlesComponent />
        </>
    );
}

export {AdminPage};