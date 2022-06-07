import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background: var(--background);
  position: relative;
  #svg-detail-top {
    position: absolute;
    top: 0;
    left: 0;
  }
  #svg-detail-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .title {
    margin-bottom: 23px;
    color: var(--gray-1);
  }
  #svg-logo {
    margin-bottom: 43px;
  }
  .form-control {
    width: 350px;
    height: 40px;
    margin-top: 10px;
    position: relative;
    input {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      border: 1px solid var(--gray-2);
      padding: 10px 20px;
      font-size: var(--font-size-7);
      border: 1px solid var(--gray-3);
    }
    .btn-signup {
      margin-top: 32px;
    }
    .btn-back-login {
      margin-top: 60px;
      background: var(--secondary);
      &:hover {
      background-color: var(--primary);
    }
    }
    #svg-eye {
      position: absolute;
      top: 25%;
      right: 5%;
      cursor: pointer;
    }
  }
  .forgot-password {
    font-size: var(--font-size-7);
    margin-top: 26px;
    margin-bottom: 48px;
    align-self: end;
    color: var(--primary);
    cursor: pointer;
  }
  .copyright {
    margin-top: 64px;
    font-size: var(--font-size-7);
    color: var(--gray-3);
    a {
      color: var(--primary);
      margin-left: 5px;
      font-weight: var(--font-weight-1);
    }
  }
  .btn {
    background-color: var(--primary);
    font-size: var(--font-size-6);
    color: var(--white);
    border: none;
    cursor: pointer;
    transition: background 0.5s ease-in-out;
    &:hover {
      background-color: var(--hover);
    }
  }
  .redirect {
    margin-top: 89px;
    font-size: var(--font-size-7);
    color: var(--text-color);
    font-weight: var(--font-weight-1);
    span {
      color: var(--primary);
    }
  }
  .wrapper {
    max-width: 80%;
    height: auto;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .footer {
    margin-top: 100px;
    justify-self: end;
    display: flex;
    font-size: var(--font-size-7);
    color: var(--gray-3);
    .privacy {
      margin-left: 56px;
    }
  }
`;
