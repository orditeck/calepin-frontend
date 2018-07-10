import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

import { EditorStore } from '../../../stores';

export default EditorStore.subscribe(
    class extends Component {
        handleValueChange = ({ target }) =>
            EditorStore.set({
                note: {
                    ...EditorStore.get('note'),
                    content: target.value
                }
            });

        render() {
            return (
                <Form>
                    <Form.Field
                        control="textarea"
                        rows="15"
                        value={this.props.note.content}
                        onChange={this.handleValueChange}
                        style={{
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0
                        }}
                    />
                </Form>
            );
        }
    }
);
