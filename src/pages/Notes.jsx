import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

import { AuthStore } from '../stores';
import Finder from '../components/notes/Finder';
import Attributes from '../components/notes/Attributes';
import Viewer from '../components/notes/Viewer';
import Editor from '../components/notes/Editor';

export default class extends Component {
    renderSidebar = () => {
        if (AuthStore.get('logged_in') === true) {
            return (
                <div className="sidebar">
                    <Switch>
                        <Route
                            path={`${this.props.match.url}/(new|edit)/:id?`}
                            component={Attributes}
                        />
                        <Route component={Finder} />
                    </Switch>
                </div>
            );
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="page-notes">
                    {this.renderSidebar()}

                    <div className="main">
                        <Switch>
                            <Route
                                exact
                                path={`${this.props.match.url}`}
                                render={() => {
                                    return <Segment basic>Select or create a new note.</Segment>;
                                }}
                            />
                            <Route path={`${this.props.match.url}/new`} component={Editor} />
                            <Route
                                path={`${this.props.match.url}/view/:id`}
                                render={props => <Viewer key={props.match.params.id} {...props} />}
                            />
                            <Route path={`${this.props.match.url}/edit/:id`} component={Editor} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
