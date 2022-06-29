import React from 'react';
import {List, Datagrid, TextField} from 'react-admin';


const ScientistsList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source='id' />
                <TextField source='username'/>
                <TextField source='firstName' />
                <TextField source='lastName'/>
                <TextField source='email'/>
                <TextField source='city' />
                <TextField source='address'/>
                <TextField source='phone'/>
                <TextField source='roles' />
            </Datagrid>
        </List>
    );
}

export {ScientistsList};