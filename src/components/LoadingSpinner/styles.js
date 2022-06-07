import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0, .4);
  z-index: 999999;
  @keyframes spinner {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.loading-spinner {
  
  width: 70px;
  height: 70px;
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid var(--primary); /* Black */
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
}
`;
