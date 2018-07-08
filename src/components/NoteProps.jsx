import React, { Component } from 'react';
import { Menu, Popup, Icon, Form, Select, Checkbox, Confirm } from 'semantic-ui-react';
import AuthStore from '../stores/Auth';
import NoteStore from '../stores/Note';
import History from '../helpers/History';

export default NoteStore.subscribe(
    class extends Component {
        state = {
            encryptionModalOpen: false
        };

        languages = [
            { key: 'raw', text: 'raw (no highlight)', value: 'raw' },
            { key: 'bash', text: 'bash', value: 'bash' },
            { key: 'coffeescript', text: 'coffeescript', value: 'coffeescript' },
            { key: 'css', text: 'css', value: 'css' },
            { key: 'dns', text: 'dns', value: 'dns' },
            { key: 'dockerfile', text: 'dockerfile', value: 'dockerfile' },
            { key: 'http', text: 'http', value: 'http' },
            { key: 'javascript', text: 'javascript', value: 'javascript' },
            { key: 'json', text: 'json', value: 'json' },
            { key: 'makefile', text: 'makefile', value: 'makefile' },
            { key: 'markdown', text: 'markdown', value: 'markdown' },
            { key: 'nginx', text: 'nginx', value: 'nginx' },
            { key: 'php', text: 'php', value: 'php' },
            { key: 'python', text: 'python', value: 'python' },
            { key: 'ruby', text: 'ruby', value: 'ruby' },
            { key: 'scss', text: 'scss', value: 'scss' },
            { key: 'shell', text: 'shell', value: 'shell' },
            { key: 'sql', text: 'sql', value: 'sql' },
            { key: 'twig', text: 'twig', value: 'twig' },
            { key: 'typescript', text: 'typescript', value: 'typescript' },
            { key: 'vim', text: 'vim', value: 'vim' },
            { key: 'xml', text: 'xml', value: 'xml' },
            { key: 'yaml', text: 'yaml', value: 'yaml' }
        ];

        toggleEditorMode = mode => () =>
            NoteStore.mergeSet({
                editor: {
                    mode: mode
                }
            });

        handleSave = () => {
            if (this.props.editor.note.id) {
                NoteStore.update();
            } else {
                NoteStore.add();
            }
        };

        handleClose = () => {
            if (
                JSON.stringify(this.props.editor.note) !==
                JSON.stringify(this.props.editor.originalNote)
            ) {
                if (
                    window.confirm(
                        "There are unsaved changed to your note, if you continue, you'll lose those changes. Do you want to continue?"
                    )
                ) {
                    this.discard();
                }
            } else {
                this.discard();
            }
        };

        discard = () =>
            NoteStore.mergeSet({
                mode: 'viewer',
                editor: {
                    originalNote: null,
                    note: null
                },
                viewer: {
                    note: this.props.editor.originalNote.id ? this.props.editor.originalNote : null
                }
            });

        onNoteChange = e =>
            NoteStore.mergeSet({
                editor: {
                    note: {
                        [e.target.name]: e.target.value
                    }
                }
            });

        onLanguageChange = (e, { value }) =>
            NoteStore.mergeSet({
                editor: {
                    note: {
                        language: value
                    }
                }
            });

        onToggleChange = (e, { name, checked }) => {
            if (checked) this.checkEncryption();
            NoteStore.mergeSet({
                editor: {
                    note: {
                        [name]: checked
                    }
                }
            });
        };

        checkEncryption = () =>
            this.setState({ encryptionModalOpen: !AuthStore.get('encryption_key') });

        renderEncryptionModal = () => (
            <Confirm
                open={this.state.encryptionModalOpen}
                onCancel={() => this.setState({ encryptionModalOpen: false })}
                onConfirm={() => {
                    History.push('/settings');
                }}
                content="You must specify your encryption key before. Would you like to set one now? Your note won't be lost as long as you keep your page open."
            />
        );

        render() {
            return (
                <div className="props-editor">
                    <Menu secondary attached="top">
                        <Menu.Item onClick={this.handleSave}>
                            <Icon name="save" /> Save
                        </Menu.Item>
                        <Menu.Item onClick={this.handleClose}>
                            <Icon name="times" /> Close
                        </Menu.Item>
                        <Popup
                            trigger={
                                <Menu.Item
                                    className="icon-only"
                                    onClick={this.toggleEditorMode('markdown')}
                                >
                                    <Icon name="book" />
                                </Menu.Item>
                            }
                            content="Markdown editor"
                            inverted
                        />
                        <Popup
                            trigger={
                                <Menu.Item
                                    className="icon-only"
                                    onClick={this.toggleEditorMode('text')}
                                >
                                    <Icon name="code" />
                                </Menu.Item>
                            }
                            content="Text editor"
                            inverted
                        />
                    </Menu>

                    <Form size="huge" style={{ padding: '20px' }}>
                        <Form.Field
                            control="input"
                            name="title"
                            label="Title"
                            placeholder="Title"
                            onChange={this.onNoteChange}
                            value={this.props.editor.note.title}
                        />
                        <Form.Field
                            control={Select}
                            options={this.languages}
                            search
                            label="Language"
                            placeholder="Language"
                            onChange={this.onLanguageChange}
                            value={this.props.editor.note.language}
                        />
                        <Form.Field
                            control={Checkbox}
                            toggle
                            name="public"
                            label="Public"
                            defaultChecked={this.props.editor.note.public}
                            onChange={this.onToggleChange}
                        />
                        <Form.Field
                            control={Checkbox}
                            toggle
                            name="encrypted"
                            label="Encrypted"
                            defaultChecked={this.props.editor.note.encrypted}
                            onChange={this.onToggleChange}
                        />

                        {this.renderEncryptionModal()}
                    </Form>
                </div>
            );
        }
    }
);
