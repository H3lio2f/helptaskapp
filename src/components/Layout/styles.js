import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 15% 1fr;
  grid-template-rows: 3fr;
  grid-template-areas:
    "sidebar topbar"
    "sidebar main";
  .main {
    grid-area: main;
    display: flex;
    flex-direction: column;
    z-index: 999;
  }
`;
