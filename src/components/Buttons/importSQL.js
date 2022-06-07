import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--primary);
  padding: 8px 20px;
  border-radius: 5px;
  color: var(--white);
  font-size: var(--font-size-7);
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  margin-left: 30px;
  svg{
    margin-left: 10px;
  }
  &:hover {
    background: var(--hover);
  }
`;

const ButtonImportSQL = () => {
  return (
    <Container>
      Importar por SQL
      <svg
        width="18"
        height="10"
        viewBox="0 0 18 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.83341 8.83333L3.00008 5L6.83341 1.16667L5.66675 0L0.666748 5L5.66675 10L6.83341 8.83333ZM11.1667 8.83333L15.0001 5L11.1667 1.16667L12.3334 0L17.3334 5L12.3334 10L11.1667 8.83333Z"
          fill="white"
        />
      </svg>
    </Container>
  );
};

export default ButtonImportSQL;
