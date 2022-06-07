import styled from "styled-components";

export const Container = styled.form`
  /*margin-top: 40px; */
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  /*height: 150vh; *//** Reajust after add pagination for clients */
  .label-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .label{
      display: flex;
    }
    label {
      font-size: var(--font-size-7);
      color: var(--secondary);
      font-weight: var(--font-weight-2);
    }
    #svg-add-portal{
      align-self: end;
    }
    svg {
      cursor: pointer;
    }
  }
  .phone{
    margin-top: 26px;
    input{
      width: 100%;
      
      &.red-border {
        border-bottom: 2px solid var(--error) !important;
        transition: all 0.5s ease-in-out;
      }
    }
    p {
      color: var(--error);
      margin: 5px 0 0 5px;
      font-size: var(--font-size-7);
    }
  }
  .form-control {
    margin-top: 26px;
    display: flex;
    flex-direction: column;
    input,
    select,
    textarea {
      background: white;
      width: 100%;
      border: 1px solid var(--text-color);
      padding: 10px 20px;
      margin-top: 10px;
      border-radius: 5px;
      &.red-border {
        border-bottom: 2px solid var(--error) !important;
        transition: all 0.5s ease-in-out;
      }
    }
    textarea{
      resize: none;
    }
    input[type="date"]::-webkit-calendar-picker-indicator {
      width: 22px;
      padding: 0px;
    }
    p {
      color: var(--error);
      margin: 5px 0 0 5px;
      font-size: var(--font-size-7);
    }
  }
  .first {
    display: grid;
    grid-tamplate-column: 2fr 1fr;
    margin-top: 26px;
    .form-control:first-child {
    }
    .form-control:last-child {
    }
  }
  .button-control {
    width: 140px !important;
  }
  .form-control-divided {
    margin-top: 20px;
    width: 100%;
    display: grid;
    align-items: end;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
  }
  .form-button-control-divided {
    display: flex;
    align-items: end;
    justify-content: space-between;
    margin-top: 40px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-top: 70px;
    .config-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-top: 30px;
      svg {
        cursor: pointer;
      }
    }
    label {
      font-size: var(--font-size-6);
      font-weight: var(--font-weight-2);
    }
    .line {
      border-bottom: 1px solid var(--gray-2);
      margin-top: 10px;
      margin-bottom: -20px;
    }
    .config-list {
      margin-top: 40px;
      display: flex;
      flex-wrap: wrap;
    }
  }

  .first-group {
    margin-top: 20px;
  }
`;

export const TaskToReply = styled.div`
  background: var(--gray-4);
  padding: 20px;
  margin-top: 30px;
  border-left: 4px solid ${(props) =>props.status };
  .subjcet {
    font-weight: var(--font-weight-3);
  }
  p {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    label {
      margin-top: 10px;
    }
  }
`;
