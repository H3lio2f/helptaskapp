import styled from "styled-components";

export const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  width: auto;
  align-items: center;
  background: var(--primary);
  padding: 12px 25px;
  border-radius: 5px;
  font-size: var(--font-size-7);
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  span {
    color: var(--white);
  }
  &:hover {
    background: var(--hover);
  }
  &:disabled {
    opacity: 0.5;
    cursor: unset;
    background: var(--secondary);
  }
  svg {
    margin-left: 10px;
  }
`;

{
  /* <svg
        width="18"
        height="13"
        viewBox="0 0 18 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.99989 10.1698L2.52989 6.69982C2.13989 6.30982 1.50989 6.30982 1.11989 6.69982C0.729893 7.08982 0.729893 7.71982 1.11989 8.10982L5.29989 12.2898C5.68989 12.6798 6.31989 12.6798 6.70989 12.2898L17.2899 1.70982C17.6799 1.31982 17.6799 0.689824 17.2899 0.299824C16.8999 -0.0901758 16.2699 -0.0901758 15.8799 0.299824L5.99989 10.1698Z"
          fill="white"
        />
      </svg> */
}
