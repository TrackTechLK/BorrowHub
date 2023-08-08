import { Layout } from "react-admin";
import { CustomMenu } from "./Menu";
import CustomNotification from "./Notifications";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

const CustomChildren = ({ children }) => {
  const location = useLocation();
  const [prevLoc, setPrevLoc] = useState();
  const [prevChildren, setPrevChildren] = useState();

  useEffect(() => {
    // setTimeout(() => {
      setPrevLoc(location.pathname.split("/").slice(0, 4).toString());
    //   setPrevChildren(children);
    // }, 250);
  }, [location]);

  return (
    <AnimatePresence>
      {location.pathname.split("/").slice(0, 4).toString() == prevLoc && (
        <motion.div
          initial={{ opacity: 0.5, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1, animation: { duration: 500 } }}
          exit={{ opacity: 0.5, scale: 0.99, animation: { duration: 500 } }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const CustomLayout = (props) => (
  <Layout
    {...props}
    menu={CustomMenu}
    notification={CustomNotification}
    children={<CustomChildren children={props.children} />}
  />
);
