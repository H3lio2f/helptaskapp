import styled from "styled-components";

export const Container = styled.div`

  .container-top{
    display: flex;
    align-items: end;
    justify-content: space-between;
  }
  transition: all 1s ease-in-out;
  .task-visibity{
    display: flex;
    align-items: center;
    margin-right: 50px;
    label{
      font-size: var(--font-size-7);
      cursor: pointer;
      margin-left: 5px;
    }
  }

  .status{
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 15px;
    
    .color{
      width: 12px;
      height: 12px;
    }
    label{
      margin-left: 8px;
      font-size: var(--font-size-7);
      cursor: pointer;
    }
  }
`;
