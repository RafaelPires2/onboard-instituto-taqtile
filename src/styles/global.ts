import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0;
    }

    html{
    scroll-behavior: smooth;
    overflow-x: hidden;
    }

    ::-webkit-scrollbar{
    width: 10px;
    background-color: #BDD8FF;
    }
    ::-webkit-scrollbar-thumb{
        border-radius: 20px;
        background-color: #31213F;
}

    body, input, textarea, button, a, li{
        font-family: 'Poppins', sans-serif;
        text-decoration: none;
        list-style: none;
        color: inherit;
    }
    body {
        display: flex;
        width: 100vw;
        height: 100%;
        justify-content: center;
        align-items: center;
        background-color: #BDD8FF;
    }
`;
