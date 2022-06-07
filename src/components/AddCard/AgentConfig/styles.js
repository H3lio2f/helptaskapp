import styled from "styled-components";

export const Container = styled.div`
    height: 150vh;
  .config-task-top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .label{
      display: flex;
      align-items: center;
      margin-right: 20px;
    }

    span {
      color: var(--primary);
      font-weight: var(--font-weight-2);
      font-size: var(--font-size-5);
    }

    svg {
      cursor: pointer;
      margin-right: 5px;
    }
  }
`;
