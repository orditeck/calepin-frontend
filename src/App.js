import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import AppLoading from './stores/AppLoading';

export default AppLoading.subscribe(
    class App extends Component {
        render() {
            return (
                <Segment basic className="app-container no-padding" loading={this.props.loading}>
                    {this.props.children}
                </Segment>
            );
        }
    }
);
