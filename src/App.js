import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import AppLoading from './stores/AppLoading';
import AuthStore from './stores/Auth';

import Menu from './components/Menu';

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
                                <Menu />
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
