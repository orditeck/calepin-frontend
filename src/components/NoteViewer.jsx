import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import NoteStore from '../stores/Note';

export default NoteStore.subscribe(
    class extends Component {
        render() {
            return <Segment>{this.props.note.content}</Segment>;
        }
    }
);
