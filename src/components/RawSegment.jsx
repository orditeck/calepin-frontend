import React, { Component } from 'react';
import classnames from 'classnames';
import { Segment } from 'semantic-ui-react';

export default class extends Component {
    render() {
        return (
            <Segment {...this.props} basic className={classnames(this.props.className, 'raw')}>
                {this.props.children}
            </Segment>
        );
    }
}
