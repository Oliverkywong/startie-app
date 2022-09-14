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
} from "react-admin";
import { User } from '../../backend/utils/model'
import ApproveButton from "./ApproveButton";
// import dataProvider from "./dataProvider";


export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="phone" />
      <TextField source="status" />
      <TextField source="description" />
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
      <TextInput source="phone" resettable />
      <TextInput source="status" resettable />
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
      <ReferenceInput source="userId" reference="users" />
      {props.map((user: any) => {
        return <TextInput source="name">{user}</TextInput>;
      })}
      <TextInput multiline source="description" />
    </SimpleForm>
  </Create>
);

const UserTitle = ({ record}:any) => {
  // const record = useRecordContext();
  return <span>User {record ? `"${record.title}"` : ""}</span>;
};

const postFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="userId" label="Team" reference="team" />,
];