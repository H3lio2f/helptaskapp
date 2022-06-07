import styled from "styled-components";

export const Container = styled.div`
  flex-wrap: wrap;
  margin-top: 60px;
  .configurations {
    margin-top: 90px;
    display: flex;
  }

  .configurations-item {
    background: rgba(196, 196, 196, 0.7);
    width: 154px;
    height: 154px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    padding: 10px;
    span {
      font-size: var(--font-size-6);
      margin-top: 20px;
      text-align: center;
    }
    &:nth-child(n + 2) {
      margin-left: 36px;
    }
    &:hover {
      background: var(--gray-3);
    }
  }
`;
