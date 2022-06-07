import styled from "styled-components";

export const Container = styled.form`
  width: 506px;
  border-radius: 5px;
  box-shadow: 0px 38px 15px rgba(0, 0, 0, 0.01),
    0px 21px 13px rgba(0, 0, 0, 0.05), 0px 10px 10px rgba(0, 0, 0, 0.09),
    0px 2px 5px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  margin-top: 118px;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  .form-control {
    display: flex;
    flex-direction: column;
    &::nth-child(1) {
      margin-top: 30px;
    }
    .error {
      align-self: start;
    }
    input {
      &:disabled {
        opacity: 0.5;
        cursor: unset;
        background: var(--secondary);
      }
    }
  }
`;
