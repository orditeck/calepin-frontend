import React, { Component } from 'react';
import { Segment, Menu, Popup, Icon } from 'semantic-ui-react';

import MarkdownEditor from './MarkdownEditor';
import TextEditor from './TextEditor';
import NoteStore from "../stores/Note";

export default NoteStore.subscribe(class extends Component {

    toggleEditorMode = (mode) => () => {
        NoteStore.set({ editor_mode: mode });
    };

    renderEditor = () => {
        return this.props.editor_mode === 'text' ?
            <TextEditor /> :
            <MarkdownEditor />;
    };

    render() {
        return (
            <div>
                <Menu attached='top'>
                    <Popup trigger={
                        <Menu.Item onClick={this.toggleEditorMode('markdown')}>
                            <Icon name='book' />
                        </Menu.Item>
                    } content='Markdown editor' inverted />
                    <Popup trigger={
                        <Menu.Item onClick={this.toggleEditorMode('text')}>
                            <Icon name='code' />
                        </Menu.Item>
                    } content='Text editor' inverted />
                </Menu>
                <Segment attached="bottom">{this.renderEditor()}</Segment>
            </div>
        );
    }
});