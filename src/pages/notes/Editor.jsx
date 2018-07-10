import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import NoteStore, { EmptyNote } from '../../stores/Note';
import Editor from '../../components/notes/Editor';
import Attributes from '../../components/notes/Attributes';

export default NoteStore.subscribe(
    class extends Component {
        componentWillMount = () => {
            if (!this.props.editor.note) {
                NoteStore.mergeSet({
                    editor: {
                        originalNote: EmptyNote,
                        note: EmptyNote
                    }
                });
            }
        };

        render() {
            return (
                <React.Fragment>
                    <Grid>
                        <Grid.Column width={4}>
                            <Segment basic loading={this.props.loading}>
                                <Attributes />
                            </Segment>
                        </Grid.Column>

                        <Grid.Column width={12}>
                            <Segment basic loading={this.props.loading}>
                                <Editor />
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </React.Fragment>
            );
        }
    }
);
