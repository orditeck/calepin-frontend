import React, { Component } from 'react';

import AppLoading from './stores/AppLoading';
import AuthStore from './stores/Auth';

import Menu from './components/Menu';
import RawSegment from './components/RawSegment';

export default AuthStore.subscribe(
    AppLoading.subscribe(
        class App extends Component {
            render() {
                return (
                    <RawSegment className="app-container" loading={this.props.loading}>
                        <div className="menu-container">
                            <Menu />
                        </div>
                        <div className="page-container">
                            <RawSegment basic loading={this.props.loading}>
                                {this.props.children}
                            </RawSegment>
                        </div>
                    </RawSegment>
                );
            }
        }
    )
);
