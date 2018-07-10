import React, { Component } from 'react';
import { Segment, Menu, Icon, Message } from 'semantic-ui-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import CryptoJS from 'crypto-js';

import { AuthStore, ViewerStore } from '../../stores';
import { Notes } from '../../models';
import MarkdownConverter from '../../helpers/MarkdownConverter';
import History from '../../helpers/History';

export default ViewerStore.subscribe(
    class extends Component {
        componentWillMount = () => {
            if (this.props.match.params.id) {
                ViewerStore.set({ loading: true });
                Notes.find(this.props.match.params.id).then(({ data }) =>
                    ViewerStore.set({
                        loading: false,
                        note: data.data
                    })
                );
            }
        };

        componentWillUnmount = () =>
            ViewerStore.set({
                note: null
            });

        handleEdit = () => History.push(`/notes/edit/${this.props.note.id}`);
        /*NoteStore.mergeSet({
                mode: 'editor',
                editor: {
                    originalNote: this.props.note,
                    note: this.props.note
                }
            });*/

        handleClose = () => History.push('/notes');

        renderTopMenu = () => {
            return this.props.note ? (
                <Menu secondary attached="top">
                    <Menu.Menu position="left">
                        <Menu.Item>{this.props.note.title}</Menu.Item>
                    </Menu.Menu>

                    {this.renderButtons()}
                </Menu>
            ) : null;
        };

        renderButtons = () => {
            return this.props.note ? (
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
            const note = this.props.note;

            if (!note || !note.id) return;

            if (note.encrypted && !AuthStore.get('encryption_key'))
                return (
                    <Message>
                        <Message.Header>Unable to decrypt</Message.Header>
                        <p>You must provide your encryption key to view this note.</p>
                    </Message>
                );

            if (note.encrypted) {
                try {
                    let bytes = CryptoJS.AES.decrypt(note.content, AuthStore.get('encryption_key'));
                    note.content = bytes.toString(CryptoJS.enc.Utf8);
                } catch (e) {
                    note.content = (
                        <Message warning>
                            <Message.Header>Encrypted note</Message.Header>
                            <p>Unable to decrypt this note with the encryption key you provided.</p>
                        </Message>
                    );
                }
            }

            switch (note.language) {
                case 'markdown':
                    return (
                        <div className="mde-preview">
                            <div
                                className="mde-preview-content"
                                dangerouslySetInnerHTML={{
                                    __html: MarkdownConverter.makeHtml(note.content)
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
            const note = this.props.note;

            return (
                <div className="calepin-viewer">
                    {this.renderTopMenu()}
                    <Segment attached={note ? 'bottom' : null}>{this.renderViewer()}</Segment>
                </div>
            );
        }
    }
);
