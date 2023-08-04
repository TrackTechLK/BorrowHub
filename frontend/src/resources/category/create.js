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

export const CommunityRequestCreate = () => (
    <Create>
        <SimpleForm>
            {/* <ReferenceInput source="user" reference='users'/> */}
            <ReferenceInput source="community" reference='communities'>
            <AutocompleteInput optionText="name" />
                </ReferenceInput> 
        </SimpleForm>
    </Create>
)

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

export const CategoryCreate = () => (
    <Create>
        <SimpleForm>
            
            <TextInput source="name"/>
            <ReferenceInput source="parent" reference="categories" >
            <AutocompleteInput optionText="name" />
            </ReferenceInput>
            
        </SimpleForm>
    </Create>
);