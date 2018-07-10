import React, { Component } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import { ViewerStore } from '../../stores';
import { Notes } from '../../models';
import History from '../../helpers/History';
import RawSegment from '../RawSegment';

export default ViewerStore.subscribe(
    class extends Component {
        state = {
            loading: false
        };

        componentWillMount = () => {
            this.setState({ loading: true });
            Notes.get().then(({ data }) => {
                this.setState({ loading: false });
                ViewerStore.set({ notes: data.data });
            });
        };

        openNote = note => () => History.push(`/notes/view/${note.id}`);

        renderNotes = () => {
            const { notes } = this.props;

            if (notes.length === 0) {
                return (
                    <Menu.Item onClick={() => History.push('/notes/new')}>
                        <p>Your notes will appear here. Click here to start writing one!</p>
                    </Menu.Item>
                );
            } else {
                return notes.map(note => {
                    const shortContent = note.encrypted
                        ? 'Encrypted note'
                        : note.content.substr(0, 100) + (note.content.length > 100 ? '\u2026' : '');
                    return (
                        <Menu.Item key={`sidebarnote-${note.id}`} onClick={this.openNote(note)}>
                            <Header size="small">{note.title}</Header>
                            <p>{shortContent}</p>
                        </Menu.Item>
                    );
                });
            }
        };

        render() {
            return (
                <RawSegment className="finder" loading={this.state.loading}>
                    <Menu vertical>{this.renderNotes()}</Menu>
                </RawSegment>
            );
        }
    }
);
