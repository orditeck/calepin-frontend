import React, { Component } from 'react';
import merge from 'deepmerge';
import { Segment, Menu, Popup, Icon, Form, Input, Select } from 'semantic-ui-react';

import MarkdownEditor from './MarkdownEditor';
import TextEditor from './TextEditor';
import NoteStore from '../stores/Note';

export default NoteStore.subscribe(
    class extends Component {
        toggleEditorMode = mode => () => {
            NoteStore.set(
                merge(NoteStore._propsAndValues, {
                    editor: {
                        mode: mode
                    }
                })
            );
        };

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

        onTitleChange = ({ target }) => {
            NoteStore.set(
                merge(NoteStore._propsAndValues, {
                    editor: {
                        note: {
                            title: target.value
                        }
                    }
                })
            );
        };

        onLanguageChange = (e, { value }) => {
            NoteStore.set(
                merge(NoteStore._propsAndValues, {
                    editor: {
                        note: {
                            language: value
                        }
                    }
                })
            );
        };

        discard = () => {
            NoteStore.set(
                merge(NoteStore._propsAndValues, {
                    mode: 'viewer',
                    editor: {
                        originalNote: null,
                        note: null
                    },
                    viewer: {
                        note: this.props.editor.originalNote.id
                            ? this.props.editor.originalNote
                            : null
                    }
                })
            );
        };

        renderEditor = () => {
            return this.props.editor.mode === 'text' ? <TextEditor /> : <MarkdownEditor />;
        };

        render() {
            const options = [
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

            return (
                <div className="calepin-editor">
                    <Menu secondary attached="top">
                        <Menu.Menu position="left">
                            <Menu.Item>
                                <Input
                                    transparent
                                    placeholder="Insert your note's title here"
                                    onChange={this.onTitleChange}
                                    value={this.props.editor.note.title}
                                />
                                <Form.Field
                                    control={Select}
                                    options={options}
                                    search
                                    placeholder="Language"
                                    onChange={this.onLanguageChange}
                                    value={this.props.editor.note.language}
                                />
                            </Menu.Item>
                        </Menu.Menu>

                        <Menu.Menu position="right">
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
                        </Menu.Menu>
                    </Menu>
                    <Segment attached="bottom">{this.renderEditor()}</Segment>
                </div>
            );
        }
    }
);
