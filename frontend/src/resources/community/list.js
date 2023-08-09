import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
  ShowButton,
  WithListContext,
  useListContext,
  RichTextField,
  TextInput,
} from "react-admin";
import EfficientReferenceField from "../../components/EfficientReferenceField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CommunityCard from "../../components/CommunityCard";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { WithGlow } from "../../components/WIthGlow";

export const CommunityListView = () => {
  const { data } = useListContext();
  return (
      <LayoutGroup>
        <Grid container style={{ padding: 10 }}>
          {data?.map((d) => (
            <Grid
              style={{ padding: 10 }}
              md={4}
              sm={6}
              component={motion.div}
              key={d.id}
              layout
              transition={{ duration: 0.5 }}
              initial={{ opacity: 0.5, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1, animation: { duration: 2000 } }}
              exit={{
                opacity: 0.5,
                scale: 0.99,
                animation: { duration: 2000 },
              }}
            >
              <WithGlow>
                <CommunityCard record={d} />
              </WithGlow>
            </Grid>
          ))}
        </Grid>
      </LayoutGroup>
  );
};

const communityFilters = [
  <TextInput label="Search" source="q" alwaysOn />,
  // <TextInput label="Title" source="title" defaultValue="Hello, World!" />,
];

export const CommunityList = () => (
  <List filters={communityFilters}>
    <CommunityListView />

    {/* <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      
      <EfficientReferenceField
        label="Creator"
        reference={"users"}
        sourceField={"creator_username"}
        idField={"creator"}
      />
      <DateField source="created_date" locales="fr-FR" />
    
      <EfficientReferenceField
        label={"Categories"}
        reference={"categories"}
        sourceField={"category_name"}
        idField={"category"}
      />
      <RichTextField source="description" />
      <ShowButton />
    </Datagrid> */}
  </List>
);
