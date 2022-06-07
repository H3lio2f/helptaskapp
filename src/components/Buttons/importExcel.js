import styled from "styled-components";

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

const ButtonImportExcel = ({ handlePortalImportExcel}) => {
  return (
    <Container onClick={handlePortalImportExcel}>
      Importar por Excel
      <svg
        width="14"
        height="17"
        viewBox="0 0 14 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.5 0H1.7C0.765 0 0.00850019 0.765 0.00850019 1.7L0 15.3C0 16.235 0.7565 17 1.6915 17H11.9C12.835 17 13.6 16.235 13.6 15.3V5.1L8.5 0ZM11.9 15.3H1.7V1.7H7.65V5.95H11.9V15.3ZM3.4 11.0585L4.5985 12.257L5.95 10.914V14.45H7.65V10.914L9.0015 12.2655L10.2 11.0585L6.8085 7.65L3.4 11.0585Z"
          fill="white"
        />
      </svg>
    </Container>
  );
};

export default ButtonImportExcel;
