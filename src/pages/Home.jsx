import React, { Component } from 'react';
import { AuthStore } from '../stores';

export default class extends Component {
    componentWillMount() {
        if (AuthStore.get('logged_in')) {
            this.props.history.push('/notes');
        } else {
            this.props.history.push('/login');
        }
    }

    render() {
        return null;
    }
}
