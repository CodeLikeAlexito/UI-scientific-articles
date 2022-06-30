import React from 'react';


import {NavigationBar} from '../NavigationBar';
import { ScientistsComponent } from './ScientistsComponent';
import { ArticlesComponent } from './ArticlesComponent';

const AdminPage = () => {
    return (
        <>
        <NavigationBar />
        <br></br>
        <div className='text-center'>
            <h1>
                Admin panel
            </h1>
        </div>
        <ScientistsComponent />
        <ArticlesComponent />
        </>
    );
}

export {AdminPage};