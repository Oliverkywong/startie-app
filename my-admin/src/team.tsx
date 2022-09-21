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
  required,
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
      <TextField source="tags" />
      <TextField source="profilepic" sortable={false} />
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
      <TextInput source="name" validate={required()} />
      <SelectInput
        source="category_id"
        validate={required()}
        resettable
        choices={[
          { id: 1, name: "Business" },
          { id: 2, name: "Startup" },
          { id: 3, name: "Investment" },
          { id: 4, name: "Hackathon" },
          { id: 5, name: "Others" },
        ]}
      />
      <TextInput multiline source="description" />
    </SimpleForm>
  </Create>
);

const TeamTitle = ({ record }: any) => {
  // const record = useRecordContext();
  return <span>Team {record ? `"${record.title}"` : ""}</span>;
};

const getTeamFilters = () =>
  [
    <SearchInput source="q" alwaysOn />,
    <TextInput source="name" />,
    <SelectInput
      source="category_id"
      choices={[
        { id: 1, name: "Business" },
        { id: 2, name: "Startup" },
        { id: 3, name: "Investment" },
        { id: 4, name: "Hackathon" },
        { id: 5, name: "Others" },
      ]}
    />,
    <TextInput source="looking_for" />,
    <TextInput source="description" />,
    <SelectInput
      source="status_id"
      choices={[
        { id: 1, name: "Active" },
        { id: 2, name: "Inactive" },
        { id: 3, name: "Pending" },
      ]}
    />,
  ].filter((filter) => filter !== null);
