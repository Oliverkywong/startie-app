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
} from 'react-admin';
//@ts-ignore
export const PostList = (props):ComponentType<any> | ReactElement<any, string | JSXElementConstructor<any>> | undefined => (
    <List>

     <Datagrid>
           <TextField source="id" />
            <ReferenceField source="userId" reference="users" />
            <TextField source="title" />
                     <EditButton />
        </Datagrid>
    </List>
);

export const PostEdit = () => (
    <Edit>
        <SimpleForm>
        <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users" />
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = (props : any) => (
        <Create {...props}>
            <SimpleForm>
                <ReferenceInput source="userId" reference="users" />
                <TextInput source="title" />
                <TextInput multiline source="body" />
            </SimpleForm>
        </Create>
    );