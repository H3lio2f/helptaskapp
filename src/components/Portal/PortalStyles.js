import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
  position: ${(props) => (props.absolute === true ? "absolute" : "fixed")};
  background-color: #fff;
  z-index: 5;
  top: 10%;
  left: 25%;
  width: 50%;
  padding: 50px;
  transition: all 0.5s cubic-bezier(0.57, 0.21, 0.69, 1.25);
  label {
    color: var(--primary);
    font-weight: var(--font-weight-3);
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 4;
  transition: all 0.5s cubic-bezier(0.57, 0.21, 0.69, 1.25);
`;
