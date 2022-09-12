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

export const TeamList = (props:any)=> (
    <List filters={postFilters}>
        
     <Datagrid>
           <TextField source="id" />
           <TextField source="name" />
            <TextField source="board" />
           <TextField source="event" />
           <TextField source="job" />
           <TextField source="description" />
            <ReferenceField source="userId" reference="users" />
                <EditButton />
        </Datagrid>
    </List>
);

export const TeamEdit = () => (
    <Edit title={<TeamTitle />}>
        <SimpleForm>
        <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users" />
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
);

export const TeamCreate = (props : any) => (
        <Create {...props}>
            <SimpleForm>
                <ReferenceInput source="userId" reference="users" />
                <TextInput source="name" />
                <TextInput source="name" />
                <TextInput multiline source="description" />
            </SimpleForm>
        </Create>
    );

const TeamTitle = () => {
        const record = useRecordContext();
           return <span>Team {record ? `"${record.title}"` : ''}</span>;
    };

const postFilters = [
        <TextInput source="q" label="Search" alwaysOn />,
        <ReferenceInput source="userId" label="Team" reference="team" />
    ];