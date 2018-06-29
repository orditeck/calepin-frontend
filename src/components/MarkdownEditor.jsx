import React, { Component } from 'react';
import merge from 'deepmerge';
import ReactMde from 'react-mde';
import Showdown from 'showdown';

import 'react-mde/lib/styles/css/react-mde-all.css';
import NoteStore from '../stores/Note';

export default NoteStore.subscribe(
    class extends Component {
        state = {
            mdeState: {
                markdown: this.props.note.content
            }
        };

        converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true,
            encodeEmails: true,
            openLinksInNewWindow: true,
            emoji: true
        });

        handleValueChange = mdeState => {
            this.setState({ mdeState: mdeState });

            NoteStore.set(
                merge(NoteStore._propsAndValues, {
                    note: {
                        content: mdeState.markdown
                    }
                })
            );
        };

        render() {
            return (
                <ReactMde
                    onChange={this.handleValueChange}
                    editorState={this.state.mdeState}
                    generateMarkdownPreview={markdown =>
                        Promise.resolve(this.converter.makeHtml(markdown))
                    }
                />
            );
        }
    }
);
