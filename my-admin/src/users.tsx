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
  ImageField,
  ImageInput,
} from "react-admin";

export const UserList = () => (
  <List filters={getUserFilters()}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="phonenumber" />
      <TextField source="name" />
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
      {/* <FileInput
        source="profilepic"
        label="Related files"
        accept="image/*,.pdf"
      >
        <FileField source="src" title="title" />
      </FileInput> */}
      <ImageInput source="profilepic" label="Related pictures" accept="image/*">
    <ImageField source="src" title="title" />
</ImageInput>
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
  <SearchInput source="q" label="Search" alwaysOn />
];

const getUserFilters = () =>
[
  <SearchInput source="q" alwaysOn />,
  <TextInput source="name" />,
  <TextInput source="phonenumber" />,
  <TextInput source="email" />,
  <TextInput source="description" />,
  <TextInput source="status" />,
].filter(filter => filter !== null);