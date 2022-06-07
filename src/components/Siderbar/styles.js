import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 15%;
  grid-area: sidebar;
  background-color: var(--secondary);
  border: none;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 5px 6px rgba(0, 0, 0, 0.25);
  .logo {
    background: var(--primary);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 68.5px;
  }
  .menu {
    flex: 1;
    display: flex;
    align-items: center;
    ul {
      width: 100%;
    }
  }
  .copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: var(--font-size-7);
    line-height: var(--line-height-1);
    margin-bottom: 40px;
    span {
      color: var(--gray-2);
      opacity: 0.5;
    }
    p {
      color: var(--gray-3);
      letter-spacing: var(--letter-spacing-3);
    }
  }
`;

export const Item = styled.li`
  padding: 20px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  .icon {
    margin-left: 10px;
  }
  a {
    color: var(--white);
    margin-left: 10px;
    font-size: var(--font-size-6);
    letter-spacing: var(--letter-spacing-1);
  }
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  &.active {
    background: rgba(255, 255, 255, 0.2);
    border-left: 10px solid var(--primary);
    transition: all 0.5s ease-in-out;
  }
`;
