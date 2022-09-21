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

export const EventList = (props:any)=> (
    <List filters={getUserFilters()}>
        
     <Datagrid rowClick="edit">
           <TextField source="id" />
           <TextField source="name" />
           <TextField source="status" />
           <TextField source="description" />
            <TextField source="maxteammember" />
            <TextField source="profilepic" sortable={false} />
                <EditButton />
        </Datagrid>
    </List>
);

export const EventEdit = (props:any) => (
    <Edit  {...props}>
        <SimpleForm>
        <TextInput disabled source="id" />
            <TextInput source="name" />
            <NumberInput source="maxteammember" min={0}/>
            <SelectInput source="status_id" validate={required()} resettable choices={[
                {id:1, name: 'Active'},
                {id:2, name: 'Inactive'},
                {id:3, name: 'Pending'}
            ]} />
            <TextInput multiline source="description" resettable fullWidth/>
            <SelectInput source="profilepic" resettable choices={[
                {id:'default.jpg', name:"default"}]} />
        </SimpleForm>
    </Edit>
);

export const EventCreate = (props : any) => (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" validate={required()}/>
                <NumberInput source="maxteammember" validate={required()} min={0} />
                <TextInput multiline source="description" />
            </SimpleForm>
        </Create>
    );

const postFilters = [
        <SearchInput source="q" label="Search" alwaysOn />
    ];

    const getUserFilters = () =>
    [
        <SearchInput source="q" alwaysOn />,
        <TextInput source="name" />,
        <SelectInput source="status_id" choices={[
            {id:1, name: 'Active'},
            {id:2, name: 'Inactive'},
            {id:3, name: 'Pending'}
        ]} />,
        <NumberInput source="maxteammember" min={0} />,
        <TextInput source="description" />
    ].filter(filter => filter !== null);