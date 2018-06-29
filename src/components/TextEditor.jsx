import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

import NoteStore from "../stores/Note";

export default NoteStore.subscribe(class extends Component {

    render() {
        return <Form>
            <Form.Field control='textarea' rows='15' />
        </Form>
    }
});