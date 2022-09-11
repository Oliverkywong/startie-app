import * as React from "react";
import { UserList } from './users';
import jsonServerProvider from 'ra-data-json-server';
import { Admin, Resource } from 'react-admin';
import { PostList, PostEdit, PostCreate } from './posts';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
    <Admin dataProvider={dataProvider}>
      <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
      <Resource name="users" list={UserList} recordRepresentation="name" />
    </Admin>
);

export default App;