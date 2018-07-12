import React, { Component } from 'react';
import { Segment, Confirm } from 'semantic-ui-react';

import MarkdownEditor from './editors/MarkdownEditor';
import TextEditor from './editors/TextEditor';
import { EditorStore, HelpStore } from '../../stores';
import { Notes } from '../../models';
import History from '../../helpers/History';

export default HelpStore.subscribe(
    EditorStore.subscribe(
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

            renderFirstNoteAlert = () => (
                <Confirm
                    open={this.props.renderFirstNoteAlert === true}
                    cancelButton="Not now"
                    confirmButton="Yes"
                    onCancel={() => {
                        HelpStore.set({ renderFirstNoteAlert: 'do-not-ask-again' });
                    }}
                    onConfirm={() => {
                        HelpStore.set({ renderFirstNoteAlert: 'do-not-ask-again' });
                        History.push('/settings');
                    }}
                    content={
                        <div className="content">
                            <p>You're adding your first note.</p>

                            <p>A word about encryption.</p>

                            <p>
                                Encryption is done 100% client-side, meaning the server never sees
                                the content of the non-encrypted note. The title is not encrypted,
                                so be sure to use a non-confidential title for your notes.
                            </p>

                            <p>You can choose to encrypt on a per-note basis.</p>

                            <p>
                                You must provide an encryption key to encrypt your notes. The same
                                encryption key will be needed every time you want to read the note.
                                If you lose your key, you lose your note(s) that are using that key.
                            </p>

                            <p>
                                You can use a different encryption key for a group of notes (or even
                                every note), but you'll have to go back and forth to the settings
                                page every time.
                            </p>

                            <p>Would you like to set your encryption key now?</p>
                        </div>
                    }
                />
            );

            render() {
                return (
                    <div className="calepin-editor">
                        {this.renderFirstNoteAlert()}

                        <Segment attached="bottom" loading={this.props.loading}>
                            {this.props.mode === 'text' ? <TextEditor /> : <MarkdownEditor />}
                        </Segment>
                    </div>
                );
            }
        }
    )
);
