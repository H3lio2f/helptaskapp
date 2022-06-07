import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  align-items: center;
  background: var(--primary);
  padding: 12px 10px;
  border-radius: 5px;
  color: var(--white);
  font-size: var(--font-size-7);
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &:hover {
    background: var(--hover);
  }
  svg {
    margin-left: 10px;
  }
`;

const ButtonReplyFilled = () => {
  return (
    <Container>
      Responder
      <svg
        width="16"
        height="12"
        viewBox="0 0 16 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.33335 2.50006V1.17506C6.33335 0.433389 5.43335 0.0583886 4.90835 0.583389L1.08335 4.40839C0.75835 4.73339 0.75835 5.25839 1.08335 5.58339L4.90835 9.40839C5.43335 9.93339 6.33335 9.56672 6.33335 8.82506V7.41672C10.5 7.41672 13.4167 8.75006 15.5 11.6667C14.6667 7.50006 12.1667 3.33339 6.33335 2.50006Z"
          fill="white"
        />
      </svg>
    </Container>
  );
};

export { ButtonReplyFilled };
