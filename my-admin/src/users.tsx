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
  required,
  PasswordInput,
  NumberInput,
} from "react-admin";

export const UserList = () => (
  <List filters={getUserFilters()}>
    <Datagrid rowClick="edit" >
      <TextField source="id" sortByOrder="DESC" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="phonenumber" />
      <TextField source="status" />
      <TextField source="description" />
      <TextField source="created_at" />
      <TextField source="profilepic" sortable={false} />
      <EditButton />
    </Datagrid>
  </List>
);

export const UserEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput disabled source="username" resettable />
      <TextInput disabled source="email" resettable />
      <TextInput source="phonenumber" />
      <SelectInput
        source="status_id"
        validate={required()}
        resettable
        choices={[
          { id: 1, name: "Active" },
          { id: 2, name: "Inactive" },
          { id: 3, name: "Pending" },
        ]}
      />
      <TextInput multiline source="description" resettable />
      <SelectInput
        source="profilepic"
        resettable
        choices={[{ id: "default.jpg", name: "default" }]}
      />
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
      <TextInput source="username" validate={[required()]} />
      <PasswordInput source="password" validate={[required()]} />
      <TextInput source="email" validate={[required()]} />
    </SimpleForm>
  </Create>
);

const postFilters = [<SearchInput source="q" label="Search" alwaysOn />];

const getUserFilters = () =>
  [
    <SearchInput source="q" alwaysOn />,
    <TextInput source="name" />,
    <TextInput source="phonenumber" />,
    <TextInput source="email" />,
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
