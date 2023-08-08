import {
  Datagrid,
  ReferenceManyField,
  RichTextField,
  Show,
  TabbedShowLayout,
  TextField,
  useUpdate,
  useRecordContext,
  useGetRecordId,
  useRefresh,
  WithRecord,
} from "react-admin";

import Button from "@mui/material/Button";

const MakeAdminButton = (record) => {
  const [update, { isLoadingUpdate, errorUpdating }] = useUpdate();

  console.log(record);

  const onClick = () => {
    console.log("update");
    //create returnconfirmation
    update("user_communities", {
      id: record.id,
      data: { user: record.user, community: record.community, is_admin: true },
    });
  };

  return (
    <Button variant="contained" onClick={onClick} disabled={record.is_admin}>
      Make admin
    </Button>
  );
};

const RemoveAdminButton = (record) => {
  const [update, { isLoadingUpdate, errorUpdating }] = useUpdate();
  const refresh = useRefresh();

  console.log(record);

  const onClick = () => {
    console.log("update");
    //create returnconfirmation
    update("user_communities", {
      id: record.id,
      data: { user: record.user, community: record.community, is_admin: false },
    }).then(() => {
      refresh();
    });
  };

  return (
    <Button variant="contained" onClick={onClick} color="error">
      Remove
    </Button>
  );
};

export const CommunityShow = () => {
const communityId = useGetRecordId()

  return (
    <Show>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="summary">
          <TextField label="Id" source="id" />
          <TextField source="name" />
          <RichTextField source="description" />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="users" path="users">
          <ReferenceManyField
            reference="user_communities"
            target="community"
            label={false}
          >
            <Datagrid>
              <TextField source="username" />
              <WithRecord label="Name" render={MakeAdminButton} />
            </Datagrid>
          </ReferenceManyField>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="admins" path="admins">
          <ReferenceManyField
            reference="user_communities"
            target="commmunity"
            label={false}
            filter={{ is_admin: true }}
          >
            <Datagrid>
              <TextField source="username" />
              <WithRecord label="Name" render={RemoveAdminButton} />
            </Datagrid>
          </ReferenceManyField>
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
