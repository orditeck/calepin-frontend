import React, { Component } from 'react';
import Auth, { DefaultState as DefaultAuthState } from '../../stores/Auth';

export default Auth.subscribe(
    class extends Component {
        componentWillMount() {
            Auth.set(DefaultAuthState);
            this.props.history.push('/auth/login');
        }

        render() {
            return <div />;
        }
    }
);
