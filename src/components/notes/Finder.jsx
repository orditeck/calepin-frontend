import React, { Component } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import { ViewerStore } from '../../stores';
import { Notes } from '../../models';
import RawSegment from '../RawSegment';

export default ViewerStore.subscribe(
    class extends Component {
        state = {
            loading: false
        };

        componentDidUpdate = prevProps => {
            if (prevProps.location.pathname !== this.props.location.pathname) {
                this.refreshNotes();
            }
        };

        componentDidMount = () => this.refreshNotes();

        refreshNotes = () => {
            this.setState({ loading: true });
            Notes.get().then(({ data }) => {
                this.setState({ loading: false });
                ViewerStore.set({ notes: data.data });
            });
        };

        openNote = note => () => this.props.history.push(`/notes/view/${note.id}`);

        renderNotes = () => {
            const { notes } = this.props;

            if (notes.length === 0) {
                return (
                    <Menu.Item onClick={() => this.props.history.push('/notes/new')}>
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
