import UserIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import TeamIcon from '@mui/icons-material/Groups';
import JobIcon from '@mui/icons-material/Group';
import * as React from "react";
import { UserCreate, UserEdit, UserList } from './users';
import restProvider from 'ra-data-simple-rest';
import { Admin, fetchUtils, AuthProvider, Resource } from 'react-admin';
import { TeamList, TeamEdit, TeamCreate } from './team';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import { MyLayout } from './Darktheme';
import { EventCreate, EventEdit, EventList } from './event';
import jsonServerProvider from 'ra-data-json-server';

// const dataProvider = jsonServerProvider('https://oliverproject.oliverstrat.me');
const httpClient = (url:string, options :any= {}) => {
  if (!options.headers) {
    options.headers = new Headers( {Accept: 'application/json'} );
  }
  const token = localStorage.getItem('auth');
 
  
  // add your own headers here
  // options.headers.set('X-Custom-Header', 'foobar');
  options.headers.set('Authorization',`Bearer ${token}`);
  
  return fetchUtils.fetchJson(url, options);
 };

 const host = `http://localhost:8000`

const dataProvider =  jsonServerProvider(host, httpClient);

// const myDataProfider = {
//   ...dataProvider,
//   edit: (resource:any, params:any) => {
//       if (resource !== 'profilepic' || !params.data.theFile) {
//           // fallback to the default implementation
//           return dataProvider.edit(resource, params);
//       }

//       let formData = new FormData();

//       formData.append('paramOne', params.data.paramOne);
//       formData.append('paramTwo', params.data.paramTwo);
//       formData.append('theFile', params.data.theFile.rawFile);

//       return httpClient(`${host}/${resource}`, {
//           method: 'PUT',
//           body: formData,
//       }).then(({ json }) => ({
//           data: { ...params.data, id: json.id },
//       }));
//   }
// };

const App = () => (
  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider} layout={MyLayout}>
    
      <Resource name="user" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon} recordRepresentation="name" />
      <Resource name="team" list={TeamList} edit={TeamEdit} create={TeamCreate} icon={TeamIcon}  />
      <Resource name="event" list={EventList} edit={EventEdit} create={EventCreate} icon={EventIcon} />
    </Admin>
);

export default App;