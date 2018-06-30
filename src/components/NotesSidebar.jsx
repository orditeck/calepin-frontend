import React, { Component } from 'react';
import { Header, Menu, Popup, Icon } from 'semantic-ui-react';
import AuthStore from '../stores/Auth';
import NoteStore, { EmptyNote } from '../stores/Note';
import merge from 'deepmerge';

export default NoteStore.subscribe(
    class extends Component {
        newNote = () => {
            NoteStore.set(
                merge(NoteStore._propsAndValues, {
                    mode: 'editor',
                    editor: {
                        originalNote: merge(EmptyNote, {
                            author_id: AuthStore.get('user').id
                        }),
                        note: merge(EmptyNote, {
                            author_id: AuthStore.get('user').id
                        })
                    }
                })
            );
        };

        openNote = note => () => {
            NoteStore.set(
                merge(NoteStore._propsAndValues, {
                    mode: 'viewer',
                    viewer: {
                        note: note
                    }
                })
            );
        };

        renderNotes = () => {
            const { notes } = this.props;

            if (notes.length === 0) {
                return (
                    <Menu.Item onClick={this.newNote}>
                        <p>Your notes will appear here. Click here to start writing one!</p>
                    </Menu.Item>
                );
            } else {
                return notes.map(note => {
                    return (
                        <Menu.Item
                            disabled={this.props.mode === 'editor'}
                            key={`sidebarnote-${note.id}`}
                            onClick={this.openNote(note)}
                        >
                            <Header size="small">{note.title}</Header>
                            <p>
                                {note.content.substr(0, 100) +
                                    (note.content.length > 100 ? '\u2026' : '')}
                            </p>
                        </Menu.Item>
                    );
                });
            }
        };

        render() {
            return (
                <div>
                    <Menu attached="top">
                        <Popup
                            trigger={
                                <Menu.Item onClick={this.newNote}>
                                    <Icon name="add" />
                                </Menu.Item>
                            }
                            content="New note"
                            inverted
                        />
                    </Menu>

                    <Menu attached="bottom" vertical className="notes-menu">
                        {this.renderNotes()}
                    </Menu>
                </div>
            );
        }
    }
);
