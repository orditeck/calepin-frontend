import React, { Component } from 'react';
import ReactMde from 'react-mde/lib/js';

import 'react-mde/lib/styles/css/react-mde-all.css';
import { EditorStore } from '../../../stores';
import MarkdownConverter from '../../../helpers/MarkdownConverter';

export default EditorStore.subscribe(
    class extends Component {
        render() {
            return (
                <ReactMde
                    onChange={mdeState =>
                        EditorStore.set({
                            mdeState: mdeState,
                            note: {
                                ...EditorStore.get('note'),
                                content: mdeState.markdown
                            }
                        })
                    }
                    editorState={this.props.mdeState}
                    generateMarkdownPreview={markdown =>
                        Promise.resolve(MarkdownConverter.makeHtml(markdown))
                    }
                />
            );
        }
    }
);
