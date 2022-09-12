import UserIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Book';
import TeamIcon from '@mui/icons-material/Groups';
import JobIcon from '@mui/icons-material/Group';
import * as React from "react";
import { UserEdit, UserList } from './users';
import jsonServerProvider from 'ra-data-json-server';
import { Admin, Resource } from 'react-admin';
import { TeamList, TeamEdit, TeamCreate } from './team';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import { MyLayout } from './Darktheme';
// import dataProvider from './dataProvider';


const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider} layout={MyLayout}>
      <Resource name="users" list={UserList} edit={UserEdit} icon={UserIcon} recordRepresentation="name" />
      <Resource name="post" list={TeamList} edit={TeamEdit} create={TeamCreate} icon={TeamIcon} />
      {/* <Resource name="event" list={EventList} edit={EventEdit} create={EventCreate} icon={EventIcon} />
      <Resource name="users" list={JobList} icon={JobIcon} /> */}
    </Admin>
);

export default App;