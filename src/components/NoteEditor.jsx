import React, { Component } from 'react';
import { Segment, Menu, Popup, Icon, Input } from 'semantic-ui-react';

import MarkdownEditor from './MarkdownEditor';
import TextEditor from './TextEditor';
import NoteStore from '../stores/Note';

export default NoteStore.subscribe(
    class extends Component {
        toggleEditorMode = mode => () => {
            NoteStore.set({
                editor: {
                    mode: mode
                }
            });
        };

        renderEditor = () => {
            return this.props.editor.mode === 'text' ? <TextEditor /> : <MarkdownEditor />;
        };

        render() {
            return (
                <div className="calepin-editor">
                    <Menu secondary attached="top">
                        <Menu.Menu position="left">
                            <Menu.Item>
                                <Input transparent placeholder="Insert your note's title here" />
                            </Menu.Item>
                        </Menu.Menu>

                        <Menu.Menu position="right">
                            <Menu.Item>
                                <Icon name="save" /> Save
                            </Menu.Item>
                            <Menu.Item>
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
