import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Menu, Icon, Popup } from 'semantic-ui-react';

import AppLoading from './stores/AppLoading';
import AuthStore from './stores/Auth';

import logo from './assets/images/logo.svg';
import { EmptyNote } from './stores/Note';
import merge from 'deepmerge';
import NoteStore from './stores/Note';

export default AuthStore.subscribe(
    AppLoading.subscribe(
        class App extends Component {
            newNote = () => {
                NoteStore.set(
                    merge(NoteStore._propsAndValues, {
                        mode: 'editor',
                        editor: {
                            originalNote: merge(EmptyNote, {
                                author_id: AuthStore.get('user').id
                            }),
                            note: merge(EmptyNote, {
                                author_id: AuthStore.get('user').id
                            })
                        }
                    })
                );
            };

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
                                        <Menu.Item as={Link} name="Login" to="/auth/login" />
                                    ) : (
                                        <React.Fragment>
                                            <Popup
                                                trigger={
                                                    <Menu.Item
                                                        name="New note"
                                                        onClick={this.newNote}
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
