import styled from "styled-components";
import {motion} from 'framer-motion';

export const Container = styled.div`
  /*display: ${(props) => (props.isShown === true ? "" : "none")};*/
  box-shadow: ${props => props.shadown && '-14px 0px 14px -5px rgba(0,0,0,0.1)'};
  z-index: 4;
  width: 55%;
   overflow-y: auto;
    height: 100vh;
  position: fixed;
  top: 0;
   right: ${(props) => (props.isShown === true ? "0" : "-58%")};
  background: var(--white);
  padding: 44px 88px;
  transition: all 0.5s cubic-bezier(0.57, 0.21, 0.69, 1.25);
  
`;
