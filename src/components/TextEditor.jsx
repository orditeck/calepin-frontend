import React, { Component } from 'react';
import merge from 'deepmerge';
import { Form } from 'semantic-ui-react';

import NoteStore from '../stores/Note';

export default NoteStore.subscribe(
    class extends Component {
        handleValueChange = ({ target }) => {
            NoteStore.set(
                merge(NoteStore._propsAndValues, {
                    note: {
                        content: target.value
                    }
                })
            );
        };

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
