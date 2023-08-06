import { styled } from "@stitches/react";
import { motion } from "framer-motion";
import { Children } from "react";

const Wrapper = styled(motion.div, {
  position: "relative",
//   width: "300px",
  height: "auto",
});

const Glow = styled(motion.div, {
  background: "linear-gradient(90deg, #ffa0ae 0%, #aacaef 75%)",
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  WebkitFilter: "blur(15px)",
  filter: "blur(15px)",
  borderRadius: "16px",
});

const Card = styled(motion.div, {
//   borderRadius: "16px",
//   marginBottom: "0px",
  overflow: "hidden",
  position: "relative",
  background: "rgba(0, 0, 0, 0)",
  position: "relative",
//   padding: "36px 24px",
  height: "100%",
  div: {
    // color: "#4a4a4c",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // height: "50px",
  },
});

export const WithGlow = ({ children }) => {
  const cardVariants = {
    hover: {
      scale: 1.05,
    },
    initial: {
      scale: 1,
    },
  };

  const glowVariants = {
    hover: {
      opacity: 0.8,
    },
    initial: {
      scale: 1.05,
      opacity: 0,
    },
  };

  return (
    <Wrapper initial="initial" whileHover="hover">
      <Glow
        variants={glowVariants}
        transition={{
          ease: "easeOut",
          delay: 0.15,
        }}
      />
      <Card>{children}</Card>
    </Wrapper>
  );
};
