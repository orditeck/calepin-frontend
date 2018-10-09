import React, { Component, Fragment } from 'react';
import { Segment, Form, Message, Button } from 'semantic-ui-react';

import { SettingsStore } from '../stores';
import { DefaultState as DefaultSettingsState } from '../stores/Settings';

export default SettingsStore.subscribe(
    class extends Component {
        onChange = e =>
            SettingsStore.set({
                [e.target.name]: e.target.value
            });

        reset = () => SettingsStore.set(DefaultSettingsState);

        render() {
            return (
                <React.Fragment>
                    <Segment basic className="half-page">
                        <h1>Settings</h1>

                        <Message
                            warning
                            content={
                                <Fragment>
                                    Your settings, <strong>including your encryption key</strong>,
                                    will remain as long as you don't clear them or reset your
                                    browser's local storage. You should clear your settings after
                                    every use if you're on a shared computer. You can do this{' '}
                                    <Button basic compact onClick={this.reset}>
                                        by clicking here
                                    </Button>{' '}
                                    or when logging out.
                                </Fragment>
                            }
                        />

                        <Form size="huge">
                            <Form.Field
                                name="encryption_key"
                                control="input"
                                type="password"
                                label="Encryption secret key"
                                placeholder="Encryption secret key"
                                autoComplete="new-password"
                                value={this.props.encryption_key}
                                onChange={this.onChange}
                            />
                            <Form.Field
                                name="api_url"
                                control="input"
                                placeholder="API url, eg. https://api.calepin.io/api/v1"
                                label={
                                    <label>
                                        API URL. <strong>Always</strong> use HTTPS.
                                    </label>
                                }
                                value={this.props.api_url}
                                onChange={this.onChange}
                            />
                        </Form>
                    </Segment>
                </React.Fragment>
            );
        }
    }
);
