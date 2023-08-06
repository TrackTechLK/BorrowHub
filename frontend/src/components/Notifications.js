import React from "react";
import { Notification } from "react-admin";
import { motion, AnimatePresence } from "framer-motion";

const CustomNotification = ({ classes, ...props }) => {
  return (
    <AnimatePresence>
      <motion.div
        key={Math.random()}
        positionTransition
        initial={{ opacity: 1, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 2 } }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 2 } }}
      >
        <Notification {...props} />
      </motion.div>
    </AnimatePresence>
  );
};

export default CustomNotification;
