import styled from "styled-components";

export const Container = styled.div`
  disple: flex;
  flex-direction: column;
  
  .all-info{
    margin-top: 60px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
  .row{
    font-size: var(--font-size-6);
    margin-bottom: 30px;
    label{
      font-weight: var(--font-weight-2);
    }
    a{
      color: var(--primary);
    }
  }
  .description{
    display: flex;
    flex-direction: column;
    span{
      margin: 10px 0 0 10px;
    }
  }
  .double_row{
    display: flex; 
    align-items: center;
    .left_time{
      margin-left: 20%;
    }
  }
`;

export const Options = styled.div`
  transform: ${(props) => (props.isOpen === true ? "scale(1)" : "scale(0)")};
  z-index: 2;
  width: 90%;
  position: absolute;
  transition: all 150ms ease-in-out;
  transform-origin: left right;

  .options-list-container {
    transition: 150ms transform;
    transform-origin: top bottom;
    .options-list {
      width: 100%;
      position: absolute;
      bottom: -80px;
      left: 16%;
      display: flex;
      flex-direction: column;
      padding: 15px 10px 20px 20px;
      margin-top: 8px;
      background: var(--gray-4);
      box-shadow: 0px 7px 12px -3px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      font-size: var(--font-size-7);
      li {
        list-style: none;
        margin-bottom: 0.8em;
        margin-top: 8px;
        display: flex;
        align-items: center;
        a {
          margin-left: 5px;
        }
      }
    }
  }
  &::after {
    transform: ${(props) => (props.isOpen === true ? "scale(1)" : "scale(0)")};
    position: absolute;
    z-index: 3;
    top: -10px;
    left: 15px;
    content: "";
    border: 10px solid transparent;
    border-right-color: var(--gray-4);
  }
`;
