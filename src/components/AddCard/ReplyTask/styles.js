import styled from "styled-components";

export const Container = styled.div`
  height: 150vh;
  .reply-top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      color: var(--primary);
      font-weight: var(--font-weight-2);
      font-size: var(--font-size-5);
    }

    svg {
      cursor: pointer;
    }
  }
`;
