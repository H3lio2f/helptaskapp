import { Overlay } from '../Portal/PortalStyles';
import { Container } from "./cardBaseStyles";

export default function CardBase({ children, isShown, shadown, setIsShown }) {
  return (
    <>
    {isShown && (
       <Overlay 
       animate={{
          opacity: 1
        }}
        initial={{
          opacity: 0
        }}
       onClick={() => setIsShown()} 

       />
    )}
    <Container 
      className="scroll-bar" 
      isShown={isShown} 
      shadown={shadown}
    >
      {children}
    </Container>
    </>
    );
}
