import React, { useEffect, useState } from "react";
import ReactDom from 'react-dom';
import { Container, Overlay } from './PortalStyles';
import { useGlobal } from "../../utils/contexts/global";

export default function Portal({children, isOpen, setIsOpen, absolute}) {
  const { setRefresh, refresh } = useGlobal();

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    setRefresh(!refresh);
  }

  
  const modalContent = isOpen ? (
    <>
      <Overlay 
      onClick={handleClose} 
        animate={{
          opacity: 1
        }}
        initial={{
          opacity: 0
        }}
      />
      <Container
        absolute={absolute}
        animate={{
          y: -5
        }}
        initial={{
          y: 500
        }}
        transition={{
          type: "twin",
          duration: .1,
          damping: 5
        }}
      >
      {children}
      </Container> 
    </>
  ): null;

  if(isBrowser){
    return ReactDom.createPortal(
      modalContent,
      document.getElementById('portal')
    );

  }
}

