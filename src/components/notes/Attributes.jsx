import React, { Component } from 'react';
import { Menu, Popup, Icon, Form, Select, Checkbox, Confirm } from 'semantic-ui-react';
import { AuthStore, EditorStore } from '../../stores';
import { Notes } from '../../models';
import History from '../../helpers/History';
import RawSegment from '../RawSegment';

export default EditorStore.subscribe(
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
            EditorStore.set({
                mode: mode
            });

        handleSave = () => {
            EditorStore.set({ loading: true });
            Notes.save(this.props.note).then(() => {
                EditorStore.set({
                    originalNote: this.props.note,
                    loading: false
                });
            });
        };

        handleClose = () => {
            if (JSON.stringify(this.props.note) !== JSON.stringify(this.props.originalNote)) {
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

        discard = () => {
            if (this.props.originalNote.id) {
                History.push(`/notes/view/${this.props.originalNote.id}`);
            } else {
                History.push(`/notes`);
            }
        };

        onNoteChange = e =>
            EditorStore.set({
                note: {
                    ...EditorStore.get('note'),
                    [e.target.name]: e.target.value
                }
            });

        onLanguageChange = (e, { value }) =>
            EditorStore.set({
                note: {
                    ...EditorStore.get('note'),
                    language: value
                }
            });

        onToggleChange = (e, { name, checked }) => {
            if (checked) this.checkEncryption();
            EditorStore.set({
                note: {
                    ...EditorStore.get('note'),
                    [name]: checked
                }
            });
        };

        checkEncryption = () =>
            this.setState({ encryptionModalOpen: !AuthStore.get('encryption_key') });

        renderEncryptionModal = () => (
            <Confirm
                open={this.state.encryptionModalOpen}
                cancelButton="No, cancel"
                confirmButton="Yes"
                onCancel={() => {
                    this.setState({ encryptionModalOpen: false });
                    EditorStore.set({
                        note: {
                            ...EditorStore.get('note'),
                            encrypted: false
                        }
                    });
                }}
                onConfirm={() => {
                    History.push('/settings');
                }}
                content={
                    <div className="content">
                        You must specify your encryption key before you can turn on encryption on
                        your note. Would you like to set one now?<br />
                        <br />
                        <strong>Your current changes will be lost.</strong>
                    </div>
                }
            />
        );

        render() {
            return (
                <RawSegment loading={this.props.loading} className="props-editor">
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
                            value={this.props.note.title}
                        />
                        <Form.Field
                            control={Select}
                            options={this.languages}
                            search
                            label="Language"
                            placeholder="Language"
                            onChange={this.onLanguageChange}
                            value={this.props.note.language}
                        />
                        <Form.Field
                            control={Checkbox}
                            toggle
                            name="public"
                            label="Public"
                            checked={this.props.note.public}
                            onChange={this.onToggleChange}
                        />
                        <Form.Field
                            control={Checkbox}
                            toggle
                            name="encrypted"
                            label="Encrypted"
                            checked={this.props.note.encrypted}
                            onChange={this.onToggleChange}
                        />

                        {this.renderEncryptionModal()}
                    </Form>
                </RawSegment>
            );
        }
    }
);
