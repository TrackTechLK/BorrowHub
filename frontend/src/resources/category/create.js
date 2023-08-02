import * as React from 'react';
import { Create, SimpleForm, TextInput, DateInput, required ,ReferenceInput, AutocompleteInput} from 'react-admin';

export const CatoegoryCreate = () => (
    <Create>
        <SimpleForm>
            
            <TextInput source="name"/>
            <ReferenceInput source="parent_id" reference="categories" >
            <AutocompleteInput optionText="name" />
            </ReferenceInput>
            
        </SimpleForm>
    </Create>
);