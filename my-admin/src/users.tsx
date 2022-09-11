import * as React from "react";
import { List, Datagrid, TextField, EmailField, EditButton, TextInput, ReferenceInput, Edit, SimpleForm } from 'react-admin';
import MyUrlField from './MyUrlField';

export const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <MyUrlField source="website" />
            <TextField source="company.name" />
            <EditButton />
        </Datagrid>
    </List>
    
);

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
        <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="phone" />
        </SimpleForm>
    </Edit>
)