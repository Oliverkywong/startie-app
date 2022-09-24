import * as React from "react";
import { useLayoutEffect } from "react";
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
  RichTextField,
  SimpleShowLayout,
  BulkExportButton,
  SaveButton,
  Toolbar,
  ChipField,
  SingleFieldList,
  AutocompleteInput,
} from "react-admin";
// import { ReferenceManyToManyField } from '@react-admin/ra-relationships'; //need to buy enterprise edition

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

const TeamEditToolbar = (props:any) => (
  <Toolbar {...props} >
      <SaveButton />
  </Toolbar>
);

// const validateName = (value) => {
//   if (value < 18) {
//       return 'Must be over 18';
//   }
//   return undefined;
// }

export const TeamList = (props: any) => (
  <List filters={getTeamFilters()} {...props}>
    <Datagrid size="small" rowClick="edit" expand={<DescriptionShow />} bulkActionButtons={<PostBulkActionButtons />}>
      <TextField source="id" sortByOrder="DESC" />
      <TextField source="name" />
      <TextField source="status" />
      <TextField source="category" />
      <TextField source="users" />
      <TextField source="tags" label="Looking for" />
      <TextField source="shortDescription" label="short description" />
    </Datagrid>
  </List>
);

export const TeamEdit = (props: any) => (
  <Edit title={<TeamTitle />} {...props}>
    <SimpleForm toolbar={<TeamEditToolbar />}>
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
      {/* <TextInput validate={required()} source="name" /> */}
      <ReferenceInput
        source="id"
        reference="user"
      >
        <AutocompleteInput label="First Member" />
      </ReferenceInput>
      <TextInput multiline source="description" fullWidth/>
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
    <TextInput source="tags" label="Looking for" />,
    <TextInput source="users" label="Users" />,
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
