import React, { Component } from 'react';
import { Segment, Menu, Icon, Message, Modal, Button } from 'semantic-ui-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import CryptoJS from 'crypto-js';

import { AuthStore, ViewerStore } from '../../stores';
import { Notes } from '../../models';
import MarkdownConverter from '../../helpers/MarkdownConverter';
import History from '../../helpers/History';

export default ViewerStore.subscribe(
    class extends Component {
        state = {
            renderDeleteConfirm: false
        };

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

        handleDelete = () => this.setState({ renderDeleteConfirm: true });

        handleClose = () => History.push('/notes');

        renderDeleteConfirmation = () => (
            <Modal
                open={this.state.renderDeleteConfirm}
                onClose={() => this.setState({ renderDeleteConfirm: false })}
            >
                <Modal.Header>Delete a note</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete this note? This action is not reversible.</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => this.setState({ renderDeleteConfirm: false })}>
                        Nope, wrong button
                    </Button>
                    <Button
                        onClick={() => {
                            this.setState({ renderDeleteConfirm: false });
                            ViewerStore.set({ loading: true });
                            Notes.delete(this.props.note.id).then(() => {
                                History.push(`/notes`);
                            });
                        }}
                        negative
                        icon="warning sign"
                        content="Yes, delete this note"
                    />
                </Modal.Actions>
            </Modal>
        );

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
            return this.props.note && AuthStore.get('logged_in') === true ? (
                <Menu.Menu position="right">
                    <Menu.Item onClick={this.handleEdit}>
                        <Icon name="pencil" /> Edit
                    </Menu.Item>
                    <Menu.Item onClick={this.handleDelete}>
                        <Icon name="trash" /> Delete
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
            const { note, loading } = this.props;

            return (
                <Segment loading={loading} className="raw calepin-viewer">
                    {this.renderDeleteConfirmation()}
                    {this.renderTopMenu()}
                    <Segment attached={note ? 'bottom' : null}>{this.renderViewer()}</Segment>
                </Segment>
            );
        }
    }
);
