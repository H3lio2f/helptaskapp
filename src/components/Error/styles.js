import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .content{
    height: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    font-size: var(--font-size-6);
    font-weight: var(--font-weight-2);
    color: var(--text-color);
    text-wrap: wrap;
    margin-left: 10px;
  }
  .error-info{
    height: 20%;
    display: flex;
    align-items; center;
    justify-content: center;
    }
    .line{
        height: 100%;
        width: 3px;
        background: var(--gray-2);
        margin-left: 10px;
    }
`;
