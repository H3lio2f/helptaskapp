import styled from "styled-components";

export const Container = styled.div`
    margin-top: 35px;
    .reply-top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      color: var(--text-secondary);
      font-weight: var(--font-weight-2);
      font-size: var(--font-size-5);
    }

    svg {
      cursor: pointer;
    }
  }
  .reply-list {
    margin-top: 20px;

    .reply {
      background: var(--gray-4);
      margin-bottom: 15px;
      padding: 15px 12px;
      display: flex;
      align-items: center;
      .avatar{
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        border-radius: 50%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: var(--font-size-7);
      }
      .info{
        margin-left: 10px;
        font-size: var(--font-size-6);
        .message{
          margin-top: 10px;
        }
        p{
          i{
            color: var(--gray-1);
          }
        }
      }
    }
  }
`;

