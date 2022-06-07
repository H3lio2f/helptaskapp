import { useRouter } from "next/router";
import { useCallback } from "react";
import styled from "styled-components";
import { useGlobal } from "../../utils/contexts/global";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--primary);
  padding: 8px 15px;
  border-radius: 5px;
  color: var(--white);
  font-size: var(--font-size-7);
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  svg{
    margin-left: 10px;
  }
  &:hover {
    background: var(--hover);
  }
`;

const ButtonAdd = ({ children }) => {
  
  const router = useRouter();
  const { setShowNewTask, setShowNewClient, setActionDone, actionDone, setRefresh, refresh } = useGlobal();

  const handleOpenAddcard = useCallback(() => {
    if (router.pathname === "/") {
      setActionDone(!actionDone);
      setRefresh(!refresh);
      setShowNewTask(true);
    }
    if (router.pathname === "/clients"){
      setActionDone(!actionDone);
      setRefresh(!refresh);
      setShowNewClient(true);
    }
    if (router.pathname === "/clients/5"){
      setActionDone(!actionDone);
      setRefresh(!refresh);
      setShowNewTask(true);
    }
  });

  return (
    <Container onClick={handleOpenAddcard}>
      {children}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
          fill="white"
        />
      </svg>
    </Container>
  );
};

export default ButtonAdd;
