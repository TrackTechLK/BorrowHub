import * as React from 'react';
import { Create, SimpleForm, TextInput, DateInput, required ,ReferenceInput, AutocompleteInput, BooleanInput} from 'react-admin';

export const CommunityCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name"/>
            {/* <ReferenceInput source="creator" reference='users'/> */}
            {/* <DateInput source="created_date"/> */}
            <ReferenceInput source="category" reference='categories'>
            <AutocompleteInput optionText="name" />
                </ReferenceInput> 
        </SimpleForm>
    </Create>
)