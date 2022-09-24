import UserIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import EventProviderIcon from '@mui/icons-material/CorporateFare';
import TeamIcon from '@mui/icons-material/Groups';
import * as React from "react";
import { UserCreate, UserEdit, UserList } from './users';
import { Admin, fetchUtils, AuthProvider, Resource } from 'react-admin';
import { TeamList, TeamEdit, TeamCreate } from './team';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import { MyLayout } from './Darktheme';
import { EventCreate, EventEdit, EventList } from './event';
import jsonServerProvider from 'ra-data-json-server';
import {BACKEND_URL, REACT_APP_API_URL} from './variables';
import { EventProviderList, EventProviderEdit, EventProviderCreate } from './event_provider';

// const dataProvider = jsonServerProvider('https://oliverproject.oliverstrat.me');
const httpClient = (url:string, options :any= {}) => {
  if (!options.headers) {
    options.headers = new Headers( {Accept: 'application/json'} );
  }
  const token = localStorage.getItem('auth');
 
  // add your own headers here
  options.headers.set('Authorization',`Bearer ${token}`);
  // options.headers.set('X-Custom-Header', 'foobar');
  
  return fetchUtils.fetchJson(url, options);
 };

 const host = BACKEND_URL

 console.log("host", host);
 console.log("react admin", REACT_APP_API_URL);

const dataProvider =  jsonServerProvider('http://localhost:8000', httpClient);


const App = () => (
  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider} layout={MyLayout}>
    
      <Resource name="user" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon} recordRepresentation="name" />
      <Resource name="team" list={TeamList} edit={TeamEdit} create={TeamCreate} icon={TeamIcon}  />
      <Resource name="event" list={EventList} edit={EventEdit} create={EventCreate} icon={EventIcon} />
      <Resource name="event_provider" list={EventProviderList} edit={EventProviderEdit} create={EventProviderCreate} icon={EventProviderIcon} recordRepresentation="name"/>
    </Admin>
);

export default App;