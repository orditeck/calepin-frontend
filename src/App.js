import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Menu, Icon, Popup } from 'semantic-ui-react';

import AppLoading from './stores/AppLoading';
import AuthStore from './stores/Auth';

import logo from './assets/images/logo.svg';
import NoteStore from './stores/Note';

export default AuthStore.subscribe(
    AppLoading.subscribe(
        class App extends Component {
            render() {
                return (
                    <Segment
                        basic
                        className="app-container no-padding"
                        loading={this.props.loading}
                    >
                        <Grid>
                            <Grid.Column width={1}>
                                <Menu icon vertical>
                                    <Menu.Item header as={Link} to="/">
                                        <img src={logo} alt="Calepin" />
                                    </Menu.Item>
                                    {!this.props.logged_in ? (
                                        <React.Fragment>
                                            <Menu.Item as={Link} name="Login" to="/auth/login" />
                                            <Menu.Item
                                                as={Link}
                                                name="Register"
                                                to="/auth/register"
                                            />
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <Popup
                                                trigger={
                                                    <Menu.Item
                                                        name="New note"
                                                        onClick={NoteStore.newNote}
                                                    >
                                                        <Icon name="add circle" />
                                                    </Menu.Item>
                                                }
                                                content="New note"
                                                inverted
                                                position="right center"
                                            />
                                            <Menu.Item as={Link} name="Your notes" to="/my-notes" />
                                            <Menu.Item as={Link} name="Logout" to="/auth/logout" />
                                        </React.Fragment>
                                    )}
                                </Menu>
                            </Grid.Column>
                            <Grid.Column width={15}>
                                <Segment basic loading={this.props.loading}>
                                    {this.props.children}
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                );
            }
        }
    )
);
