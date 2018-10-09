import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import AuthStore, { DefaultState as DefaultAuthState } from '../../stores/Auth';
import SettingsStore, { DefaultState as DefaultSettingsState } from '../../stores/Settings';
import EditorStore, { DefaultState as DefaultEditorState } from '../../stores/Editor';

export default AuthStore.subscribe(
    class extends Component {
        state = {
            cleared: false
        };

        componentWillMount() {
            AuthStore.set(DefaultAuthState);
        }

        clearCache = () => {
            SettingsStore.set(DefaultSettingsState);
            EditorStore.set(DefaultEditorState);
            localStorage.clear();
            sessionStorage.clear();
            this.setState({
                cleared: true
            });
        };

        render() {
            return (
                <Segment basic>
                    <h1>You are now logged out.</h1>

                    <p>Would you like to clear all the application saved settings?</p>

                    <p>It's better if you're using a shared computer in a non-incognito mode.</p>

                    {!this.state.cleared ? (
                        <Button onClick={this.clearCache}>Clear application cache</Button>
                    ) : (
                        <p>All caches have been cleared.</p>
                    )}
                </Segment>
            );
        }
    }
);
