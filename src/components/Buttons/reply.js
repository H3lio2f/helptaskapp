import styled from "styled-components";
import { useGlobal } from "../../utils/contexts/global";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--primary);
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--primary);
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  margin: 0 15px;
  svg{
    margin-left: 10px;
  }
`;

const ButtonReply = ({ task, handleReply}) => {
  return (
    <Container onClick={handleReply}>
      {task.replies.length > 0 ? (
        <>
      Ler({task.replies.length})
     
      </>
      ): (
        <>
      Responder
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.33332 7.50006V6.17506C8.33332 5.43339 7.43332 5.05839 6.90832 5.58339L3.08332 9.40839C2.75832 9.73339 2.75832 10.2584 3.08332 10.5834L6.90832 14.4084C7.43332 14.9334 8.33332 14.5667 8.33332 13.8251V12.4167C12.5 12.4167 15.4167 13.7501 17.5 16.6667C16.6667 12.5001 14.1667 8.33339 8.33332 7.50006Z"
          fill="#3498DB"
        />
      </svg>
      </>
      )}
    </Container>
  );
};

export { ButtonReply };
