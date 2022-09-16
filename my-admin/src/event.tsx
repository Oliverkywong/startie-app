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
    SearchInput
} from 'react-admin';

export const EventList = (props:any)=> (
    <List filters={getUserFilters()}>
        
     <Datagrid rowClick="edit">
           <TextField source="id" />
           <TextField source="name" />
           <TextField source="status_id" />
           <TextField source="description" />
            <TextField source="maxteammember" />
                <EditButton />
        </Datagrid>
    </List>
);

export const EventEdit = (props:any) => (
    <Edit title={<EventTitle />} {...props}>
        <SimpleForm>
        <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="maxteammember" />
            <SelectInput source="status_id" emptyValue={null} resettable choices={[
                {id:1, name: 'active'},
                {id:2, name: 'inactive'},
                {id:3, name: 'pending'}
            ]} />
            <TextInput multiline source="description" resettable />
        </SimpleForm>
    </Edit>
);

export const EventCreate = (props : any) => (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" />
                <TextInput source="maxteammember" />
                <TextInput multiline source="description" />
            </SimpleForm>
        </Create>
    );

const EventTitle = () => {
        const record = useRecordContext();
           return <span>Event {record ? `"${record.title}"` : ''}</span>;
    };

const postFilters = [
        <SearchInput source="q" label="Search" alwaysOn />
    ];

    const getUserFilters = () =>
    [
        <SearchInput source="q" alwaysOn />,
        <TextInput source="name" />,
    ].filter(filter => filter !== null);