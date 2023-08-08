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
} from "react-admin";
import EfficientReferenceField from "../../components/EfficientReferenceField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CommunityCard from "../../components/CommunityCard";
import { AnimatePresence, motion } from "framer-motion";
import { WithGlow } from "../../components/WIthGlow";

const CommunityListView = () => {
  const { data } = useListContext();
  return (
    <AnimatePresence
      initial={{ opacity: 0.5, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1, animation: { duration: 2000 } }}
      exit={{ opacity: 0.5, scale: 0.99, animation: { duration: 2000 } }}
    >
      <Grid container style={{ padding: 10 }}>
        {data?.map((d) => (
          <Grid style={{ padding: 10 }} md={4} sm={6}>
            <motion.div
              key={d.id}
              layout
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0.5, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1, animation: { duration: 2000 } }}
              exit={{
                opacity: 0.5,
                scale: 0.99,
                animation: { duration: 2000 },
              }}
              // style={props.style}
            >
              <WithGlow>
                <CommunityCard record={d}/>
              </WithGlow>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </AnimatePresence>
  );
};

export const CommunityList = () => (
  <List>
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
      <ShowButton />
    </Datagrid> */}
  </List>
);
