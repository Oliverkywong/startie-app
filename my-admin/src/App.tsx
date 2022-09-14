import UserIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import TeamIcon from '@mui/icons-material/Groups';
import JobIcon from '@mui/icons-material/Group';
import * as React from "react";
import { UserEdit, UserList } from './users';
import restProvider from 'ra-data-simple-rest';
import { Admin, fetchUtils, ListGuesser, Resource } from 'react-admin';
import { TeamList, TeamEdit, TeamCreate } from './team';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import { MyLayout } from './Darktheme';
import { EventCreate, EventEdit, EventList } from './event';
import simpleRestProvider from 'ra-data-simple-rest';
import fakeRestProvider from 'ra-data-fakerest';
// import { data } from './data';
// import dataProvider from './dataProvider';
import jsonServerProvider from 'ra-data-json-server';

// const dataProvider = jsonServerProvider('https://oliverproject.oliverstrat.me');
const httpClient = (url:string, options :any= {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  // add your own headers here
  options.headers.set('X-Custom-Header', 'foobar');
  
  return fetchUtils.fetchJson(url, options);
 };



const dataProvider =  jsonServerProvider(`http://localhost:8000`, httpClient);



const App = () => (
  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider} layout={MyLayout}>
      <Resource name="user" list={UserList} edit={UserEdit} icon={UserIcon} recordRepresentation="name" />
      <Resource name="team" list={TeamList} edit={TeamEdit} create={TeamCreate} icon={TeamIcon}  />
      <Resource name="albums" list={EventList} edit={EventEdit} create={EventCreate} icon={EventIcon} />
      {/* <Resource name="users" list={JobList} icon={JobIcon} /> */}
    </Admin>
);

export default App;