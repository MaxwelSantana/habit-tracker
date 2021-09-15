import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import GlobalStyle from './GlobalStyle';

function App() {
    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                </Switch>
            </Router>
            <GlobalStyle />
        </div>
    );
}
export default App;
