import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import NoteStore from '../stores/Note';
import NoteViewer from '../components/NoteViewer';
import NoteEditor from '../components/NoteEditor';
import NotesSidebar from '../components/NotesSidebar';
import Auth from '../stores/Auth';

export default Auth.subscribe(
    NoteStore.subscribe(
        class extends Component {
            componentWillMount() {
                NoteStore.fetchAll();
            }

            render() {
                return (
                    <React.Fragment>
                        <Grid>
                            <Grid.Column width={4}>
                                <Segment basic loading={this.props.loading}>
                                    <NotesSidebar notes={this.props.notes} />
                                </Segment>
                            </Grid.Column>

                            <Grid.Column width={12}>
                                <Segment basic loading={this.props.loading}>
                                    {this.props.mode === 'viewer' ? <NoteViewer /> : <NoteEditor />}
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </React.Fragment>
                );
            }
        }
    )
);
