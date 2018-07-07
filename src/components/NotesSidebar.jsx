import React, { Component } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import NoteStore from '../stores/Note';
import merge from 'deepmerge';

export default NoteStore.subscribe(
    class extends Component {
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
                <React.Fragment>
                    <Menu vertical>{this.renderNotes()}</Menu>
                </React.Fragment>
            );
        }
    }
);
