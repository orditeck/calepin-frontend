import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Auth from '../stores/Auth';

export default Auth.subscribe(
    class extends Component {
        render() {
            const { logged_in } = this.props;

            return (
                <header>
                    <Menu>
                        <div className="ui container">
                            <Menu.Item header>Calepin</Menu.Item>
                            {!logged_in ? (
                                <Menu.Item as={Link} name="Login" to="/auth/login" />
                            ) : (
                                <React.Fragment>
                                    <Menu.Item as={Link} name="Your notes" to="/my-notes" />
                                    <Menu.Item as={Link} name="Logout" to="/auth/logout" />
                                </React.Fragment>
                            )}
                        </div>
                    </Menu>
                </header>
            );
        }
    }
);
