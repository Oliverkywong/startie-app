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
      <TextField source="id" sortable={false}/>
      <TextField source="username" sortable={false}/>
      <EmailField source="email" sortable={false}/>
      <TextField source="phonenumber" sortable={false}/>
      <TextField source="status" sortable={false}/>
      <BooleanField source="isadmin" sortable={false}/>
      <TextField source="created_at" sortable={false}/>
      <TextField source="profilepic" sortable={false} />
    </Datagrid>
  </List>
);

export const UserEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm toolbar={<UserEditToolbar />}>
      <TextInput disabled source="id" />
      <TextInput disabled source="username" resettable />
      <TextInput disabled source="email" resettable />
      <BooleanInput source="isadmin" />
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
    // <SelectInput
    //   source="isadmin"
    //   choices={[
    //     { id: , name: "true" },
    //     { id: , name: "fa" },
    //   ]}
    // />
  ].filter((filter) => filter !== null);
