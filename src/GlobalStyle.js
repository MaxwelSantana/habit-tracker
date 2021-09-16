import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  body, button {
    margin:0;
    padding: 0;
  }

  *, button, input {
    font-family: 'Roboto', sans-serif;
  }

  html, body {
    height: 100%;
  }

  body {
    background: var(--background);
  }

  :root {
    --selected-day: #ffffff;
    --selected-day-background: #712FD4;
    --selected-navitem: #ffffff;
    --selected-navitem-background: #712FD4;
    --surface: #ffffff;
    --background: #F9FAFB;
    --border: 1px solid rgba(0,0,0,.2);
    --dashboard-card: #8A67F7;
    --border-radius: 10px;
    --primary: #712FD4;
    --icon: #ffffff;
    --icon-disabled: rgb(144 140 140 / 50%);
  }
`;
export default GlobalStyle;
