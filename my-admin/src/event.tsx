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
    useRecordContext
} from 'react-admin';

export const EventList = (props:any)=> (
    <List filters={postFilters}>
        
     <Datagrid>
           <TextField source="id" />
           <TextField source="name" />
            <TextField source="board" />
           <TextField source="event" />
           <TextField source="job" />
           <TextField source="description" />
            <ReferenceField source="userId" reference="users" />
            <TextField source="title" />
            <TextField source="completed" />
                <EditButton />
        </Datagrid>
    </List>
);

export const EventEdit = () => (
    <Edit title={<EventTitle />}>
        <SimpleForm>
        <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users" />
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
);

export const EventCreate = (props : any) => (
        <Create {...props}>
            <SimpleForm>
                <ReferenceInput source="userId" reference="users" />
                {props.map((user:any) => {return (<TextInput source="name">{user}</TextInput>)})}
                <TextInput multiline source="description" />
            </SimpleForm>
        </Create>
    );

const EventTitle = () => {
        const record = useRecordContext();
           return <span>Event {record ? `"${record.title}"` : ''}</span>;
    };

const postFilters = [
        <TextInput source="q" label="Search" alwaysOn />,
        <ReferenceInput source="userId" label="Event" reference="Event" />
    ];