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
} from "react-admin";

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="phone" />
      <TextField source="status" />
      <TextField source="description" />
      <TextField source="profilepic" />
      <EditButton />
    </Datagrid>
  </List>
);

export const UserEdit = () => (
  <Edit>
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
