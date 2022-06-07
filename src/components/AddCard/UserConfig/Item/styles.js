import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 20px;
  margin: 0 10px 10px 10px;
  border-radius: 5px;
  border: 1px solid var(--gray-2);
  .top{
    display: flex;
    align-items: center;
    .avatar{
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: var(--font-size-7);
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--gray-2);
      margin-right: 8px;
    }
  }
  img{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 8px;
  }
  span {
    font-size: var(--font-size-6);
    text-transform: capitalize;
  }
  svg {
    margin-left: 15px;
    cursor: pointer;
    float: right;
  }
`;
