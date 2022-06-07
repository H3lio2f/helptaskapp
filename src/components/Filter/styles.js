import styled from "styled-components";

export const Container = styled.div`
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  z-index: 0;
  label {
    font-size: var(--font-size-7);
    color: var(--text-color-7);
    font-weight: var(--font-weight-2);
    margin-left: 10px;
  }
  .filter-controller {
    border: 1px solid var(--gray-2);
    margin-top: 10px;
    width: 100%;
    height: 30px;
    border-radius: 5px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 10px 0 0;
    input {
      flex: 1;
      height: 100%;
      padding: 10px 40px;
    }
    .svg-icon-filter {
      posistion: absolute;
      right: 100px;
      top: 0;
      cursor: pointer;
    }
  }
`;
