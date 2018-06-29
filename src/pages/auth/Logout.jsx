import React, { Component } from 'react';
import cookie from 'js-cookie/src/js.cookie';
import Auth, { DefaultState as DefaultAuthState } from '../../stores/Auth';

export default Auth.subscribe(
    class extends Component {
        componentWillMount() {
            cookie.remove('AuthState');
            Auth.set(DefaultAuthState);
            this.props.history.push('/auth/login');
        }

        render() {
            return <div />;
        }
    }
);
