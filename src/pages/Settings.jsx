import React, { Component } from 'react';
import { Segment, Form } from 'semantic-ui-react';

import AuthStore from '../stores/Auth';

export default AuthStore.subscribe(
    class extends Component {
        onEncryptionKeyChange = e =>
            AuthStore.set({
                encryption_key: e.target.value
            });

        render() {
            return (
                <React.Fragment>
                    <Segment basic>
                        <Form size="huge">
                            <Form.Field
                                control="input"
                                type="password"
                                label="Encryption secret key"
                                placeholder="Encryption secret key"
                                autoComplete="new-password"
                                value={this.props.encryption_key}
                                onChange={this.onEncryptionKeyChange}
                            />
                        </Form>
                    </Segment>
                </React.Fragment>
            );
        }
    }
);
