import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin: 0 10px 10px 10px;
  border-radius: 5px;
  border: 1px solid var(--gray-2);
  span {
    font-size: var(--font-size-6);
    text-transform: capitalize;
  }
  svg {
    margin-left: 15px;
    cursor: pointer;
  }
`;
