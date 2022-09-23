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
    NumberInput
} from 'react-admin';

export const EventProviderList = (props:any)=> (
    <List filters={getEventProviderFilters()} bulkActionButtons={false}>
     <Datagrid rowClick="edit">
           <TextField source="id" sortable={false}/>
           <TextField source="name" sortable={false} />
           <TextField source="profile_pic" sortable={false}/>
                <EditButton />
        </Datagrid>
    </List>
);

export const EventProviderEdit = (props:any) => (
    <Edit  {...props}>
        <SimpleForm>
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

const postFilters = [
        <SearchInput source="q" label="Search" alwaysOn />
    ];

    const getEventProviderFilters = () =>
    [
        <SearchInput source="q" alwaysOn />,
        <TextInput source="name" />
    ].filter(filter => filter !== null);