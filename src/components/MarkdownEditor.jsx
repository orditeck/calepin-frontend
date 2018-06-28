import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import ReactMde from 'react-mde';
import Showdown from 'showdown';

import 'react-mde/lib/styles/css/react-mde-all.css';
import NoteStore from "../stores/Note";

export default NoteStore.subscribe(class extends Component {
    state = {
        mdeState: null
    };

    converter = new Showdown.Converter({tables: true, simplifiedAutoLink: true});

    handleValueChange = (mdeState) => {
        this.setState({mdeState});
    };

    render() {
        return (
            <ReactMde
                onChange={this.handleValueChange}
                editorState={this.state.mdeState}
                generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
            />
        );
    }
});