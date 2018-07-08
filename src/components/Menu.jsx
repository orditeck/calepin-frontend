import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Popup } from 'semantic-ui-react';

import AuthStore from '../stores/Auth';

import logo from '../assets/images/logo.svg';
import NoteStore from '../stores/Note';

export default AuthStore.subscribe(
    class App extends Component {
        render() {
            return (
                <Menu icon vertical>
                    <Menu.Item header as={Link} to="/">
                        <img src={logo} alt="Calepin" />
                    </Menu.Item>
                    {!this.props.logged_in ? (
                        <React.Fragment>
                            <Menu.Item as={Link} name="Login" to="/auth/login" />
                            <Menu.Item as={Link} name="Register" to="/auth/register" />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Popup
                                trigger={
                                    <Menu.Item name="New note" onClick={NoteStore.newNote}>
                                        <Icon name="add circle" />
                                    </Menu.Item>
                                }
                                content="New note"
                                inverted
                                position="right center"
                            />
                            <Menu.Item as={Link} name="Your notes" to="/my-notes" />
                            <Menu.Item as={Link} name="Settings" to="/settings" />
                            <Menu.Item as={Link} name="Logout" to="/auth/logout" />
                        </React.Fragment>
                    )}
                </Menu>
            );
        }
    }
);
