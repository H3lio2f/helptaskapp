// globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  :root{
    overflow-x: hidden;

    /* Colors */
    --primary:    #3498DB;
    --secondary:  #2D3436;
    --black:      #000000;
    --white:      #FFFFFF;
    --text-color: #636E72;
    --background: #FFFFFF;
    --gray-1:     #706C6C;
    --gray-2:     #E5E5E5;
    --gray-3:     #C4C4C4;
    --gray-4:     #F5F3F3;
    --hover:      #0F88DA;
    --error:      #e74c3c;
    --opened:     #F39C12;
    --closed:     #27AE60;
    --waiting:    #e74c3c;
    --in_progess: #f1c40f;
    --to_assign:  #7f8c8d;
    .snack{
      color: red !important;
    }

    /* Fonts */
    --font-primary: 'Roboto', sans-serif;

    /* Font Sizes */
    --font-size-1: 3.052rem;
    --font-size-2: 2.441rem;
    --font-size-3: 1.953rem;
    --font-size-4: 1.563rem;
    --font-size-5: 1.25rem;
    --font-size-6: 1rem;
    --font-size-7: 0.8rem;
    --font-size-8: 0.512rem;
    --font-size-9: 0.41rem;

    /* Font Weights */
    --font-weight-1: 400;
    --font-weight-2: 500;
    --font-weight-3: 700;

    /* Font Line Heights */
    --line-height-1: 1.5;

    /* Font Spacing */
    --letter-spacing-1: 0.5px;
    --letter-spacing-2: 1px;
    --letter-spacing-3: 1.5px;
    --letter-spacing-4: 2px;
    --letter-spacing-5: 2.5px;
    --letter-spacing-6: 3px;
    --letter-spacing-7: 3.5px;

  }
  *{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    &::before, &::after{
      box-sizing: border-box
    }
  }

  a{
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
  *, html, body {
    background: var(--background);
    /* color: var(--text-color); */

  }
  .scroll-bar{
    overflow-y: scroll;
    scrollbar-color: rgba(52, 152, 219, .4) transparent;
    scrollbar-width: thin;
    scroll-behavior: smooth;
    -moz-appearance: none !important;
    ::-webkit-scrollbar {
        width: 20px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(52, 152, 219, .4);
      border-radius: 20px;
      border: 6px solid transparent;
      background-clip: content-box;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--primary);
      cursor: pointer;
     
    }
    ::-webkit-scrollbar-button{
      background-color: rgba(52, 152, 219, .4);
      cursor: pointer;
    }
  }
   /* html{
    overflow-y: scroll;
    scrollbar-color: rgba(52, 152, 219, .4) transparent;
    scrollbar-width: thin;
    scroll-behavior: smooth;
    -moz-appearance: none !important;
    ::-webkit-scrollbar {
        width: 20px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(52, 152, 219, .4);
      border-radius: 20px;
      border: 6px solid transparent;
      background-clip: content-box;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--primary);
      cursor: pointer;
    }
    ::-webkit-scrollbar-button{
      background-color: rgba(52, 152, 219, .4);
      cursor: pointer;
    }
  } */
  *, input, button{
    border: 0;
    outline: none;
    background: none;
    font-family: var(--font-primary);
  }

  .attaches{
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    label{
      color: var(--text-primary);
      font-weight: var(--font-weight-2);
    }
    .list{
      margin-top: 10px;
    }
  }

  .overlay{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background: transparent;
  }

  .foreground{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border: none;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
  opacity: 1;
  transition: all 1s ease-in-out;
  }
  .inner-main-container {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .options{
    display: flex;
    align-self: flex-end;
    color: var(--primary);
    justify-self: flex-end;
  }
  }

  .top-control {
    margin-top: 40px;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: end;
    float: right;
    float: right;
    .view-control {
      margin-right: 72px;
      svg {
        cursor: pointer;
      }
    }
  }

  .empty-list{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 65vh;
    span{
      margin-top: 10px;
    }
    a{
      margin-top: 10px;
      color: var(--primary);
    }
  }

  .red-border {
    border-bottom: 2px solid var(--error) !important;
    transition: all 0.5s ease-in-out;
  }

  .error{
    color: var(--error);
    margin: 5px 0 0 5px;
    font-size: var(--font-size-7);
  }

  

  .tooltip {
      display: flex;
      align-items: center;
      margin-left: 10px;
      position: relative;
      &::before,
      &::after {
        position: absolute;
        transition: all 150ms ease-in-out;
        transform-origin: bottom center;
      }
      &::before {
        top: -40px;
        left: -50px;
        transform: scale(0);
        content: attr(datatooltip);
        color: white;
        font-size: var(--font-size-7);
        padding: 0.5rem;
        border-radius: 0.3rem;
        text-align: center;
        text-transform: lowercase;
        width: max-content;
        background: var(--gray-1);
      }
      &::after {
        top: -10px;
        right: 0;
        bottom: -2px;
        transform: scale(0);
        content: "";
        border: 10px solid transparent;
        border-top-color: var(--gray-1);
        transform-origin: top center;
      }
      &:hover::before,
      &:hover::after {
        transform: scale(1);
      }
    }
`;

export default GlobalStyle;
