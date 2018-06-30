import React, { Component } from 'react';
import merge from 'deepmerge';
import ReactMde from 'react-mde';

import 'react-mde/lib/styles/css/react-mde-all.css';
import NoteStore from '../stores/Note';

export default NoteStore.subscribe(
    class extends Component {
        state = {
            mdeState: {
                markdown: this.props.editor.note.content
            }
        };

        handleValueChange = mdeState => {
            this.setState({ mdeState: mdeState });

            NoteStore.set(
                merge(NoteStore._propsAndValues, {
                    editor: {
                        note: {
                            content: mdeState.markdown
                        }
                    }
                })
            );
        };

        render() {
            return (
                <ReactMde
                    onChange={this.handleValueChange}
                    editorState={this.state.mdeState}
                    generateMarkdownPreview={markdown =>
                        Promise.resolve(NoteStore.markdownConverter.makeHtml(markdown))
                    }
                />
            );
        }
    }
);
