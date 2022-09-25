import * as React from "react";
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
    SelectInput,
    SearchInput,
    required,
    NumberInput,
    BulkExportButton,
    SaveButton,
    Toolbar,
    Pagination
} from 'react-admin';

const PostBulkActionButtons = () => (
    <React.Fragment>
      <BulkExportButton />
    </React.Fragment>
  );

  const EventProviderEditToolbar = (props: any) => (
    <Toolbar {...props}>
      <SaveButton />
    </Toolbar>
  );

  const PostPagination = () => <Pagination rowsPerPageOptions={[5, 10, 15, 20]}/>;

export const EventProviderList = (props:any)=> (
    <List filters={getEventProviderFilters()} bulkActionButtons={false} pagination={<PostPagination />} >
     <Datagrid rowClick="edit" bulkActionButtons={<PostBulkActionButtons />}>
           <TextField source="id" />
           <TextField source="name" />
                <EditButton />
        </Datagrid>
    </List>
);

export const EventProviderEdit = (props:any) => (
    <Edit  {...props}>
        <SimpleForm toolbar={<EventProviderEditToolbar />} >
        <TextInput disabled source="id" />
            <TextInput source="name" />
            <SelectInput source="profile_pic" resettable choices={[
                {id:'default.jpg', name:"default"}]} />
        </SimpleForm>
    </Edit>
);

export const EventProviderCreate = (props : any) => (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" validate={required()}/>
            </SimpleForm>
        </Create>
    );


    const getEventProviderFilters = () =>
    [
        <SearchInput source="q" alwaysOn />,
        <TextInput source="name" />
    ].filter(filter => filter !== null);