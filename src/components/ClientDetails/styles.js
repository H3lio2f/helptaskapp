import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  .options{
    float: right;
    display: flex;
    align-items: center;
    color: var(--primary);
  }

  .top-detail {
    margin-top: 10px;
    background: rgba(229, 229, 229, 0.2);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 40px 20px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr;
    grid-gap: 10px;
    .list-info{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
  .avatar{
    grid-row: 1 / span 2;
    flex-shrink: 0;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: var(--gray-2);
    border: 4px solid var(--gray-2);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: var(--font-size-3);
    color: var(--gray-3);
    margin-bottom: 10px;
  }
  .info{
    display: flex;
    flex-direction: column;
    label{
      color: var(--text-color);
      font-weight: var(--font-weight-3);
    }
    span{
      margin-top: 5px;
      color: var(--text-color);
    }
  }

  .history{
    margin-top: 20px;
    border: 1px solid var(--gray-2);
    padding: 20px 40px 20px;
    label{
      font-size: var(--font-size-5);
    }
    .history-top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      button{
        background: var(--primary);
        color: var(--white);
        cursor: pointer;
        border-radius: 5px;
        padding: 10px 20px;
      }
    }
    .task-histories{
      margin-top: 30px;
      display: flex;
      div{
        margin-right: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        label{
          font-size: var(--font-size-6);
        }
        span{
          color: var(--primary);
          margin-top: 5px;
          font-size: var(--font-size-4);
        }
        p{
          font-size: var(--font-size-5);
          margin-top: 5px;
        }
      }
    }
  }

  .tasks{
    margin-top: 20px;
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
