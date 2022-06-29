import React from 'react';
import {Admin, Resource} from 'react-admin';
import lb4Provider from 'react-admin-lb4';
import { ScientistsList } from './ScientistList';
import restProvider from 'ra-data-simple-rest';
import simpleRestProvider from 'ra-data-simple-rest';

const dataProvider = restProvider('http://localhost:4001/');

const AdminPage = () => {
    return (
        <>
        <div>Admin component</div>
        <Admin dataProvider={dataProvider} >
            <Resource name='client/' list={ScientistsList} />
        </Admin>
        </>
    );
}

export {AdminPage};