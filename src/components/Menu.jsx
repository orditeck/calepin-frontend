import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Popup } from 'semantic-ui-react';

import AuthStore from '../stores/Auth';
import logo from '../assets/images/logo.svg';

export default AuthStore.subscribe(
    class App extends Component {
        renderIconItem = (title, icon, url) => (
            <Popup
                trigger={
                    <Menu.Item as={Link} to={url}>
                        <Icon name={icon} />
                    </Menu.Item>
                }
                content={title}
                inverted
                position="right center"
            />
        );

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
                            {this.renderIconItem('Your notes', 'sticky note', '/notes')}
                            {this.renderIconItem('New note', 'add circle', '/notes/new')}
                            {this.renderIconItem('Settings', 'settings', '/settings')}
                            {this.renderIconItem('Logout', 'log out', '/auth/logout')}
                        </React.Fragment>
                    )}
                </Menu>
            );
        }
    }
);
