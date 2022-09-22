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
    ChipField,
    SingleFieldList,
    ReferenceArrayField,
    RichTextField,
    SimpleShowLayout,
    BulkExportButton,
    SaveButton,
    Toolbar
} from 'react-admin';

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

const EventEditToolbar = (props:any) => (
<Toolbar {...props} >
    <SaveButton />
</Toolbar>
);

export const EventList = (props:any)=> (
    <List filters={getUserFilters()}>
     <Datagrid size="small" rowClick="edit" expand={<DescriptionShow />} bulkActionButtons={<PostBulkActionButtons />}>
           <TextField source="id" sortable={false}/>
           <TextField source="event_name" sortable={false} />
           {/* <ReferenceArrayField
                        label="Tag"
                        reference="event"
                        source="searchcategory_id"
                        cellClassName="hiddenOnSmallScreens"
                        headerClassName="hiddenOnSmallScreens"
                    >
                        <SingleFieldList>
                            <ChipField source="category" size="small" />
                        </SingleFieldList>
                    </ReferenceArrayField> */}

           <TextField source="category" sortable={false}/>
           <TextField source="provider_name" sortable={false}/>
           <TextField source="status" sortable={false}/>\
           <TextField source="maxteammember" sortable={false}/>
           <TextField source="shortDescription" sortable={false}/>
            <TextField source="event_profilepic" sortable={false} />
        </Datagrid>
    </List>
);

export const EventEdit = (props:any) => (
    <Edit  {...props}>
        <SimpleForm toolbar={<EventEditToolbar />}>
        <TextInput disabled source="id" />
            <TextInput source="event_name" />
            <TextInput source="provider_name" disabled/>
            <NumberInput source="maxteammember" min={0}/>
            <SelectInput source="status_id" validate={required()} resettable choices={[
                {id:1, name: 'Active'},
                {id:2, name: 'Inactive'},
                {id:3, name: 'Pending'}
            ]} />
            <SelectInput source="searchcategory_id" label="Category" validate={required()} resettable choices={[
                {id:1, name: 'Business'},
                {id:2, name: 'Startup'},
                {id:3, name: 'Investment'},
                {id:4, name: 'Hackathon'},
                {id:5, name: 'Others'} ]}/>
            <TextInput source="shortDescription" resettable />
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
                <SelectInput source="category_id" validate={required()} resettable choices={[
                {id:1, name: 'Business'},
                {id:2, name: 'Startup'},
                {id:3, name: 'Investment'},
                {id:4, name: 'Hackathon'},
                {id:5, name: 'Others'}
            ]} />
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