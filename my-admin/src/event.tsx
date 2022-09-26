import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  Edit,
  Create,
  SimpleForm,
  ReferenceInput,
  TextInput,
  SelectInput,
  SearchInput,
  required,
  NumberInput,
  RichTextField,
  SimpleShowLayout,
  BulkExportButton,
  SaveButton,
  Toolbar,
  AutocompleteInput,
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

const EventEditToolbar = (props: any) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export const EventList = (props: any) => (
  <List filters={getEventFilters()}>
    <Datagrid
      size="small"
      rowClick="edit"
      expand={<DescriptionShow />}
      bulkActionButtons={<PostBulkActionButtons />}
    >
      <TextField source="id" />
      <TextField source="event_name" label="Name" />
      <TextField source="category" />
      <ReferenceField
        label="Provider"
        source="event_provider_id"
        reference="event_provider"
        sortable={false}
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="status" />\
      <TextField source="maxteammember" />
      <TextField source="shortDescription" />
      <TextField source="event_profilepic" label="Profile pic"/>
    </Datagrid>
  </List>
);

export const EventEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm toolbar={<EventEditToolbar />}>
      <TextInput disabled source="id" />
      <TextInput source="event_name" />
      <TextInput source="provider_name" disabled />
      <NumberInput source="maxteammember" min={0} />
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
      <SelectInput
        source="searchcategory_id"
        label="Category"
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
      <ReferenceInput
        label="Provider"
        source="event_provider_id"
        reference="event_provider"
      >
        <AutocompleteInput label="Provider" />
      </ReferenceInput>
      <TextInput source="shortDescription" resettable />
      <TextInput multiline source="description" resettable fullWidth />
      <SelectInput
        source="profilepic"
        resettable
        choices={[{ id: "default.jpg", name: "default" }]}
      />
    </SimpleForm>
  </Edit>
);

export const EventCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <NumberInput source="maxteammember" validate={required()} min={0} />
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
      <TextInput multiline source="shortDescription" fullWidth resettable/>
      <TextInput multiline source="description" fullWidth resettable/>     
      <ReferenceInput 
        label="Provider"
        source="event_provider_id"
        reference="event_provider"
      >
        <AutocompleteInput  fullWidth label="Provider" validate={required()}/>
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

const getEventFilters = () =>
  [
    <SearchInput source="q" alwaysOn />,
    <TextInput source="name" />,
    <SelectInput
    source="searchcategory_id"
    choices={[
      { id: 1, name: "Business" },
      { id: 2, name: "Startup" },
      { id: 3, name: "Investment" },
      { id: 4, name: "Hackathon" },
      { id: 5, name: "Others" },
    ]} label="Category"/>,
    <SelectInput
      source="status_id"
      choices={[
        { id: 1, name: "Active" },
        { id: 2, name: "Inactive" },
        { id: 3, name: "Pending" },
      ]}
    />,
    <ReferenceInput 
        label="Provider"
        source="event_provider_id"
        reference="event_provider"
      >
        <AutocompleteInput  fullWidth label="Provider" validate={required()}/>
      </ReferenceInput>,
    <NumberInput source="maxteammember" min={0} />,
    <TextInput source="description" />,
    <TextInput source="shortDescription" label="Short Description" />
  ].filter((filter) => filter !== null);
