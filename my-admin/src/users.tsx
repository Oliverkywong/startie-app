import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  TextInput,
  Edit,
  SimpleForm,
  Create,
  SelectInput,
  SearchInput,
  required,
  PasswordInput,
  BooleanField,
  BooleanInput,
  SimpleShowLayout,
  RichTextField,
  BulkExportButton,
  Toolbar,
  SaveButton,
} from "react-admin";

const DescriptionShow = () => (
  <SimpleShowLayout>
      <RichTextField source="description" />
  </SimpleShowLayout>
);

const PostBulkActionButtons = () => (
  <React.Fragment>
      <BulkExportButton />
  </React.Fragment>
);

const UserEditToolbar = (props:any) => (
  <Toolbar {...props} >
      <SaveButton />
  </Toolbar>
);

export const UserList = () => (
  <List filters={getUserFilters()} >
    <Datagrid size="small" rowClick="edit" expand={<DescriptionShow />} bulkActionButtons={<PostBulkActionButtons />}>
      <TextField source="id" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="phonenumber" label="Phone" />
      <TextField source="status" />
      <BooleanField source="isadmin" label="Admin" />
      <TextField source="created_at" sortable={false}/>
      <TextField source="profilepic" label="Profile pic" sortable={false} />
    </Datagrid>
  </List>
);

export const UserEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm toolbar={<UserEditToolbar />}>
      <TextInput disabled source="id" />
      <TextInput disabled source="username" resettable />
      <TextInput disabled source="email" resettable />
      <BooleanInput source="isadmin" label="Admin"/>
      <TextInput source="phonenumber" label="Phone"/>
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
      <TextInput multiline source="description" fullWidth resettable />
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
      <TextInput source="username" validate={[required()]} />
      <PasswordInput source="password" validate={[required()]} />
      <TextInput source="email" validate={[required()]} />
    </SimpleForm>
  </Create>
);

const getUserFilters = () =>
  [
    <SearchInput source="q" alwaysOn />,
    <TextInput source="name" />,
    <TextInput source="phonenumber" label="Phone"/>,
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
    <SelectInput
    source="isadmin"
    label="Admin"
    optionValue="name"
    optionText="label"
    choices={choices}
    />
  ].filter((filter) => filter !== null);

  const choices = [
    { name: 'true', label: 'Yes' },
    { name: 'false', label: 'No' }
];