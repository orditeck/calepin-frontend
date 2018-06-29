import React, { Component } from 'react';
import { Header, Menu, Popup, Icon } from 'semantic-ui-react';
import NoteStore, { EmptyNote } from '../stores/Note';

export default NoteStore.subscribe(
    class extends Component {
        handleNewNoteClick = () => {
            NoteStore.set({
                mode: 'editor',
                note: EmptyNote
            });
        };

        handleNoteClick = note => () => {
            NoteStore.set({
                note: note
            });
        };

        renderNotes = () => {
            const { notes } = this.props;

            if (notes.length === 0) {
                return (
                    <Menu.Item onClick={this.handleNewNoteClick}>
                        <p>Your notes will appear here. Click here to start writing one!</p>
                    </Menu.Item>
                );
            } else {
                return notes.map(note => {
                    return (
                        <Menu.Item
                            key={`sidebarnote-${note.id}`}
                            onClick={this.handleNoteClick(note)}
                        >
                            <Header>{note.title}</Header>
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
                                <Menu.Item onClick={this.handleNewNoteClick}>
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
