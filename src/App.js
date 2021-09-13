import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
const Header = styled.h1`
    color: red;
`;

function App() {
    return (
        <>
            <Header>Hello World</Header>
            <GlobalStyle />
        </>
    );
}

export default App;
