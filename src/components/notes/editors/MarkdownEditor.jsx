import React, { Component } from 'react';
import ReactMde from 'react-mde';

import 'react-mde/lib/styles/css/react-mde-all.css';
import { EditorStore } from '../../../stores';
import MarkdownConverter from '../../../helpers/MarkdownConverter';

export default EditorStore.subscribe(
    class extends Component {
        state = {
            mdeState: {
                markdown: this.props.note.content
            }
        };

        handleValueChange = mdeState => {
            this.setState({ mdeState: mdeState });
            EditorStore.set({
                note: {
                    ...EditorStore.get('note'),
                    content: mdeState.markdown
                }
            });
        };

        render() {
            return (
                <ReactMde
                    onChange={this.handleValueChange}
                    editorState={this.state.mdeState}
                    generateMarkdownPreview={markdown =>
                        Promise.resolve(MarkdownConverter.makeHtml(markdown))
                    }
                />
            );
        }
    }
);
