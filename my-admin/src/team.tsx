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
  SearchInput,
  FunctionField,
  SelectInput,
  FileField,
  FileInput,
  ImageField,
  ImageInput,
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
  
  <List filters={getTeamFilters()} {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" sortByOrder="DESC" />
      <TextField source="name" />
      <TextField source="status" />
      <TextField source="category" />
      <TextField source="description" />
      <TextField source="users" />
      <TextField source="looking_for" />
      <TextField source="profilepic" sortable={false}/>
      {/* <ReferenceField source="userId" reference="team" /> */}
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
    <TextInput source="name" />
    <SelectInput source="category_id" emptyValue={null} resettable choices={[
        {id:1, name: 'Business'},
        {id:2, name: 'Startup'},
        {id:3, name: 'Investment'},
        {id:4, name: 'Hackathon'},
        {id:5, name: 'Others'},
      ]} />
    <TextInput multiline source="description" />
    <ImageInput source="profilepic" accept="image/*">
    <ImageField source="src" title="title" />
</ImageInput>
    
    </SimpleForm>
  </Create>
);

const TeamTitle = ({ record}:any) => {
  // const record = useRecordContext();
  return <span>Team {record ? `"${record.title}"` : ""}</span>;
};

const getTeamFilters = () =>
[
  <SearchInput source="q" alwaysOn />,
  <TextInput source="name" />,
  <TextInput source="looking_for" />,
  <TextInput source="description" />,
  <TextInput source="status" />,
].filter(filter => filter !== null);