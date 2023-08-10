import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
  useCreate,
  useUpdate,
  WithRecord,
  useListContext,
  useDelete,
} from "react-admin";
import Button from "@mui/material/Button";
import BorrowRequestCard from "../../components/BorrowRequestsCard";
import Grid from "@mui/material/Grid";
import { AnimatePresence, motion } from "framer-motion";
import { WithGlow } from "../../components/WIthGlow";

export const BorrowRequestListView = () => {
  const { data } = useListContext();
  return (
    <AnimatePresence
      initial={{ opacity: 0.5, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1, animation: { duration: 2000 } }}
      exit={{ opacity: 0.5, scale: 0.99, animation: { duration: 2000 } }}
    >
      <Grid container style={{ padding: 10 }}>
        {data?.map((d) => (
          <Grid style={{ padding: 10 }} sm={12}>
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
              <BorrowRequestCard
                record={d}
                AcceptButton={() => <AcceptButton record={d} />}
                DeclineButton={() => <DeclineButton record={d} />}
              />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </AnimatePresence>
  );
};

export const BorrowRequestList = () => (
  <List>
    <BorrowRequestListView />
    {/* <Datagrid>
      <TextField source="id" />
      <TextField source="item_type" />
      <TextField source="description" />
      <BooleanField source="accepted" />
      <WithRecord label="Name" render={AcceptButton} />
    </Datagrid> */}
  </List>
);

const AcceptButton = ({ record }) => {
  console.log(record);

  const [create, { isLoading, error }] = useCreate();
  const [update, { isLoadingUpdate, errorUpdating }] = useUpdate();

  const onAccept = () => {
    console.log("update");
    //create returnconfirmation
    create("lend_confirmations", {
      data: { borrow_request: record.id, lent: true, received: false },
    });
    update("borrow_requests", { id: record.id, data: { accepted: true } });
  };

  return (
    <div style={{ display: "flex", width: "90%", justifyContent: "flex-end" }}>
      <Button variant="contained" onClick={onAccept} disabled={record.accepted}>
        Accept
      </Button>
    </div>
  );
};

const DeclineButton = ({ record }) => {
  console.log(record);

  // const [create, { isLoading, error }] = useCreate();
  // const [update, { isLoadingUpdate, errorUpdating }] = useUpdate();
  const [deleteOne] = useDelete();

  const onDecline = () => {
    console.log("update");
    // TODO
    deleteOne("borrow_requests", { id: record.id });
  };

  return (
    <div style={{ display: "flex", width: "10%", justifyContent: "flex-end" }}>
      <Button
        variant="contained"
        onClick={onDecline}
        disabled={record.accepted}
        color="error"
      >
        Decline
      </Button>
    </div>
  );
};
