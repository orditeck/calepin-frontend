import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

export default class extends Component {
    render() {
        return (
            <Segment basic>
                <h1>Welcome!</h1>

                <h2>Register or login to continue.</h2>
            </Segment>
        );
    }
}
