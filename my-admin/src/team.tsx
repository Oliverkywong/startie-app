import * as React from "react";
import { useEffect } from "react";
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  Edit,
  Create,
  SimpleForm,
  ReferenceInput,
  TextInput,
  useRecordContext,
} from "react-admin";
// import dataProvider from "./dataProvider";

// export const TeamProfile = ({ userId }: any) => {
//     // const dataProvider = useDataProvider();
//     const [team, setTeam] = React.useState();
//     const [loading, setLoading] = React.useState(true);
//     const [error, setError] = React.useState();

//     React.useEffect(() => {
//        console.log("useEffect");
       
//         const fetchTeam = async () => {
//        let data:any= await dataProvider.getOne('team')
//        if(data){
//         setTeam(data);
//         setLoading(false);
//         console.log('data:',data)
//        } else{
//         setError(error);
//         setLoading(false);
//        }
//     }

         
//     }, []);}


export const TeamList = (props: any) => (
  
  <List filters={teamFilters} {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      {/* <TextField source="board" /> */}
      {/* <TextField source="event" />
      <TextField source="job" /> */}
      <TextField source="description" />
      {/* <ReferenceField source="userId" reference="team" /> */}
      <EditButton />
    </Datagrid>
  </List>
);

export const TeamEdit = (props: any) => (
  <Edit title={<TeamTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="Description" />
    </SimpleForm>
  </Edit>
);

export const TeamCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="userId" reference="users" />
      {props.map((user: any) => {
        return <TextInput source="name">{user}</TextInput>;
      })}
      <TextInput multiline source="description" />
    </SimpleForm>
  </Create>
);

const TeamTitle = ({ record}:any) => {
  // const record = useRecordContext();
  return <span>Team {record ? `"${record.title}"` : ""}</span>;
};

const teamFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="userId" label="Team" reference="team" />,
];