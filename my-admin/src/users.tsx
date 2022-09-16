import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  TextInput,
  ReferenceInput,
  Edit,
  SimpleForm,
  Create,
  FileInput,
  FileField,
  Button,
  useDataProvider,
  SelectInput,
  SearchInput,
  usePermissions,
} from "react-admin";

// const getUserFilters = (permissions:any) =>
//     [
//         <SearchInput source="q" alwaysOn />,
//         <TextInput source="name" />,
//         permissions === 'admin' ? <TextInput source="role" /> : null,
//     ].filter(filter => filter !== null);

//     const { permissions } = usePermissions();

export const UserList = () => (
  
  
  <List filters={postFilters}
  // {getUserFilters(permissions)}
  >
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="phonenumber" />
      <TextField source="status_id" />
      <TextField source="description" />
      <TextField source="created_at" />
      <TextField source="profilepic" />
      <EditButton />
    </Datagrid>
  </List>
);

export const UserEdit = (props:any) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="username" resettable />
      <TextInput source="email" resettable />
      <TextInput source="phonenumber" resettable />
      <SelectInput source="status_id" emptyValue={null} resettable choices={[
        {id:1, name: 'active'},
        {id:2, name: 'inactive'},
        {id:3, name: 'pending'}
      ]}
       />
      <TextInput multiline source="description" resettable />
      <FileInput
        source="profilepic"
        label="Related files"
        accept="image/*,.pdf"
      >
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Edit>
);

export const UserCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      {/* <ReferenceInput source="userId" reference="users" />
      {props.map((user: any) => {
        return <TextInput source="name">{user}</TextInput>;
      })} */}
      <TextInput source="username" />
      <TextInput source="password" />
      <TextInput source="email" />
      <TextInput multiline source="description" />
    </SimpleForm>
  </Create>
);

const UserTitle = ({ record}:any) => {
  // const record = useRecordContext();
  return <span>User {record ? `"${record.title}"` : ""}</span>;
};

const postFilters = [
  <TextInput source="username" label="Search" alwaysOn />,
  <TextInput source="name" />,
  // <ReferenceInput source="id" reference="id" />,
];

