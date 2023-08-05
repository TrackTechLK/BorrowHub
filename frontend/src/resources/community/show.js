import {
  Datagrid,
  ReferenceManyField,
  RichTextField,
  Show,
  TabbedShowLayout,
  TextField,
} from "react-admin";

export const CommunityShow = () => {
  return (
    <Show>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="summary">
          <TextField label="Id" source="id" />
          <TextField source="name" />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="users" path="users">
          <ReferenceManyField reference="users" target="user_id" label={false}>
            <Datagrid>
              <TextField source="username" />
            </Datagrid>
          </ReferenceManyField>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="admins" path="admins">
          <ReferenceManyField reference="user_communities" target="user_id" label={false} filter={{ is_admin: true }}>
            <Datagrid>
              <TextField source="username" />
            </Datagrid>
          </ReferenceManyField>
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
