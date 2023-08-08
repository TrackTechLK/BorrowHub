import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Datagrid, DatagridBody, DatagridRow } from "react-admin";

const CustomDatagridRow = (props) => (
  <AnimatePresence
    {...props}
    initial={{ opacity: 0.5, scale: 0.99 }}
    animate={{ opacity: 1, scale: 1, animation: { duration: 2000 } }}
    exit={{ opacity: 0.5, scale: 0.99, animation: { duration: 2000 } }}
  >
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0.5, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1, animation: { duration: 2000 } }}
      exit={{ opacity: 0.5, scale: 0.99, animation: { duration: 2000 } }}
      {...props}
      style={props.style}
    >
      <DatagridRow {...props} component={motion.div}/>
    </motion.div>
  </AnimatePresence>
);

const CustomDatagridBody = (props) => (
  <DatagridBody {...props} row={<CustomDatagridRow />} />
);
export const AnimatedDatagrid = (props) => (
  <Datagrid {...props} body={<CustomDatagridBody />} />
);
