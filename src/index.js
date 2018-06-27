import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './styles/main.css';

import App from './App';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import Notes from './pages/Notes';

ReactDOM.render(
    <BrowserRouter >
        <App>
            <Header />

            <div className="ui container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/auth/login" component={Login} />
                    <Route path="/auth/logout" component={Logout} />
                    <Route path="/my-notes" component={Notes} />
                </Switch>
            </div>

            <Footer />
        </App>
    </BrowserRouter>, document.getElementById('root'));
