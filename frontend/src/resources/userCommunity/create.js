import * as React from 'react';
import { Create, SimpleForm, TextInput, DateInput, required ,ReferenceInput, AutocompleteInput, BooleanInput} from 'react-admin';

export const UserCommunityCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="user" reference='users'/>
            <ReferenceInput source="community" reference='communities'>
            <AutocompleteInput optionText="name" />
                </ReferenceInput> 
            <BooleanInput source="is_admin" /> 
        </SimpleForm>
    </Create>
)