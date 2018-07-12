import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import MarkdownEditor from './editors/MarkdownEditor';
import TextEditor from './editors/TextEditor';
import { EditorStore } from '../../stores';
import { Notes } from '../../models';

export default EditorStore.subscribe(
    class extends Component {
        componentWillMount = () => {
            if (this.props.match.params.id) {
                EditorStore.set({
                    type: 'edit',
                    loading: true
                });
                Notes.find(this.props.match.params.id).then(({ data }) =>
                    EditorStore.set({
                        loading: false,
                        note: data.data,
                        mdeState: {
                            markdown: data.data.content
                        }
                    })
                );
            } else {
                EditorStore.new();
            }
        };
        componentWillUnmount = () => EditorStore.reset();

        render() {
            return (
                <div className="calepin-editor">
                    <Segment attached="bottom" loading={this.props.loading}>
                        {this.props.mode === 'text' ? <TextEditor /> : <MarkdownEditor />}
                    </Segment>
                </div>
            );
        }
    }
);
