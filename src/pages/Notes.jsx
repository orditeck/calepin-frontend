import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import NoteStore from '../stores/Note';
import NoteViewer from '../components/NoteViewer';
import NoteEditor from '../components/NoteEditor';
import NotesSidebar from '../components/NotesSidebar';

export default NoteStore.subscribe(
    class extends Component {
        componentWillMount() {
            NoteStore.set({ loading: true });
            NoteStore.fetchAll(() => {
                NoteStore.set({ loading: false });
            });
        }

        render() {
            return (
                <div>
                    <Grid>
                        <Grid.Column width={4}>
                            <Segment basic loading={this.props.loading} style={{ padding: '1px' }}>
                                <NotesSidebar notes={this.props.notes} />
                            </Segment>
                        </Grid.Column>

                        <Grid.Column width={12}>
                            <Segment basic loading={this.props.loading} style={{ padding: '1px' }}>
                                {this.props.mode === 'view' ? <NoteViewer /> : <NoteEditor />}
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </div>
            );
        }
    }
);
