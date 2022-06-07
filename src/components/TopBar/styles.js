import styled, { keyframes, css } from "styled-components";
import { wobble } from 'react-animations';

const bounceAnimation = keyframes`${wobble}`;

export const Container = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 85%;
  z-index: 1;
  grid-area: topbar;
  height: 70px;
  background-color: var(--primary);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  .inner-container {
    max-width: 90%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    .noty{
      transition: 150ms transform;
      transform-origin: top bottom;
      z-index: 9999999999999;
      .dropdown-list {
        width: 400px;
        height: 150px;
        position: absolute;
        top: 22px;
        right: -130px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        text-align: center;
        margin-top: 8px;
        background: #ffffff;
        box-shadow: 0px 7px 12px -3px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        font-size: var(--font-size-6);
        button{
          margin-top: 20px;
          color: var(--primary);
          font-size: var(--font-size-6);
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
  .notify {
    position: relative;
    .bage {
      position: absolute;
      left: 40%;
      top: -20%;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--white);
      color: var(--primary);
      font-weight: var(--font-weight-1);
      font-size: var(--font-size-7);
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    }
    
  }
  .user {
    margin-left: 50px;
    z-index: 2;
    position: relative;
    .dropdown-header {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .dropdown-list-container {
      transition: 150ms transform;
      transform-origin: top bottom;
      .dropdown-list {
        width: 100%;
        position: absolute;
        left: 10%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 15px 10px 20px 10px;
        margin-top: 8px;
        background: #ffffff;
        box-shadow: 0px 7px 12px -3px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        font-size: var(--font-size-7);
        li {
          list-style: none;
          margin-bottom: 0.8em;
          margin-top: 8px;
        }
      }
    }
    .photo {
      background: var(--white);
      width: 35px;
      height: 35px;
      border-radius: 50%;
      color: var(--text-color);
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: var(--font-weight-2);
      border: 4px solid var(--gray-2);
      font-size: var(--font-size-6);
      text-transform: uppercase;
    }
    .logged-in {
      margin: 0 10px;
      span {
        color: var(--white);
        text-transform: capitalize;
      }
      p {
        font-size: var(--font-size-7);
        color: var(--gray-4);
        text-transform: capitalize;
      }
    }
  }
`;

export const BouncyDiv = styled.div`
  ${props => props.lateTaskLength > 0 && css`
  animation: 1s ${bounceAnimation} infinite;
  `}
  cursor: pointer;
`;
