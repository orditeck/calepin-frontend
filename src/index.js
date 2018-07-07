import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route, Link } from 'react-router-dom';
import history from './helpers/History';

import 'semantic-ui-css/semantic.min.css';
import './styles/main.css';

import App from './App';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import Notes from './pages/Notes';

ReactDOM.render(
    <Router history={history}>
        <App>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/auth/login" component={Login} />
                <Route path="/auth/logout" component={Logout} />
                <Route path="/my-notes" component={Notes} />
            </Switch>
        </App>
    </Router>,
    document.getElementById('root')
);
