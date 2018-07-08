import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import MarkdownEditor from './MarkdownEditor';
import TextEditor from './TextEditor';
import NoteStore from '../stores/Note';

export default NoteStore.subscribe(
    class extends Component {
        render() {
            return (
                <div className="calepin-editor">
                    <Segment attached="bottom">
                        {this.props.editor.mode === 'text' ? <TextEditor /> : <MarkdownEditor />}
                    </Segment>
                </div>
            );
        }
    }
);
