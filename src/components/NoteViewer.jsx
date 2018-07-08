import React, { Component } from 'react';
import { Segment, Menu, Icon, Message } from 'semantic-ui-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import CryptoJS from 'crypto-js';

import AuthStore from '../stores/Auth';
import NoteStore from '../stores/Note';

export default NoteStore.subscribe(
    class extends Component {
        handleEdit = () =>
            NoteStore.mergeSet({
                mode: 'editor',
                editor: {
                    originalNote: this.props.viewer.note,
                    note: this.props.viewer.note
                }
            });

        handleClose = () =>
            NoteStore.mergeSet({
                viewer: {
                    note: null
                }
            });

        renderTopMenu = () => {
            return this.props.viewer.note ? (
                <Menu secondary attached="top">
                    <Menu.Menu position="left">
                        <Menu.Item>{this.props.viewer.note.title}</Menu.Item>
                    </Menu.Menu>

                    {this.renderButtons()}
                </Menu>
            ) : null;
        };

        renderButtons = () => {
            return this.props.viewer.note ? (
                <Menu.Menu position="right">
                    <Menu.Item onClick={this.handleEdit}>
                        <Icon name="pencil" /> Edit
                    </Menu.Item>
                    <Menu.Item onClick={this.handleClose}>
                        <Icon name="times" /> Close
                    </Menu.Item>
                </Menu.Menu>
            ) : null;
        };

        renderViewer = () => {
            const note = this.props.viewer.note;

            if (!note) return 'Select or create a new note.';

            if (note.encrypted && !AuthStore.get('encryption_key'))
                return (
                    <Message>
                        <Message.Header>Encrypted note</Message.Header>
                        <p>You must provide your encryption key to view this note.</p>
                    </Message>
                );

            if (note.encrypted) {
                let bytes = CryptoJS.AES.decrypt(note.content, AuthStore.get('encryption_key'));
                note.content = bytes.toString(CryptoJS.enc.Utf8);
            }

            switch (note.language) {
                case 'markdown':
                    return (
                        <div className="mde-preview">
                            <div
                                className="mde-preview-content"
                                dangerouslySetInnerHTML={{
                                    __html: NoteStore.markdownConverter.makeHtml(note.content)
                                }}
                            />
                        </div>
                    );
                case 'raw':
                case 'text':
                    return <div>{note.content}</div>;
                default:
                    return (
                        <SyntaxHighlighter language={note.language} style={docco}>
                            {note.content}
                        </SyntaxHighlighter>
                    );
            }
        };

        render() {
            const note = this.props.viewer.note;

            return (
                <div className="calepin-viewer">
                    {this.renderTopMenu()}
                    <Segment attached={note ? 'bottom' : null}>{this.renderViewer()}</Segment>
                </div>
            );
        }
    }
);
