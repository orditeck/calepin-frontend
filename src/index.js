import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import history from './helpers/History';

import 'semantic-ui-css/semantic.min.css';
import './styles/main.css';

import App from './App';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import Register from './pages/auth/Register';
import Notes from './pages/Notes';
import Settings from './pages/Settings';

ReactDOM.render(
    <Router history={history}>
        <App>
            <Switch>
                <Route exact path="/" component={Home} />

                <Route path="/auth/login" component={Login} />
                <Route path="/auth/logout" component={Logout} />
                <Route path="/auth/register" component={Register} />

                <Route path="/notes" component={Notes} />

                <Route path="/settings" component={Settings} />
            </Switch>
        </App>
    </Router>,
    document.getElementById('root')
);
