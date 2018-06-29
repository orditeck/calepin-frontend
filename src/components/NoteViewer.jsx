import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

import NoteStore from '../stores/Note';

export default NoteStore.subscribe(
    class extends Component {
        render() {
            return (
                <Segment className="calepin-viewer">
                    <SyntaxHighlighter language="php" style={docco}>
                        {this.props.note.content}
                    </SyntaxHighlighter>
                </Segment>
            );
        }
    }
);
