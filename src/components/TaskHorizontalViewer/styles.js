import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid var(--gray-2);
   ul{
      list-style: none;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      justify-content: space-between;
      background: var(--primary);
      color: var(--white);
      padding: 10px;
   }
   ul.body{
      background: none;
      color: var(--text-color);
      border-bottom: 1px solid var(--gray-2);
      cursor: pointer;
   }
`;
