import React, { Component } from 'react';
import { Header, Menu, Popup, Icon } from 'semantic-ui-react';
import NoteStore, { EmptyNote } from "../stores/Note";

export default NoteStore.subscribe(class extends Component {

    handleNewNoteClick = () => {
        NoteStore.set({
            mode: 'editor',
            note: EmptyNote
        });
    };

    render() {
        return (
            <div>
                <Menu attached='top'>
                    <Popup trigger={
                        <Menu.Item onClick={this.handleNewNoteClick}>
                            <Icon name='add' />
                        </Menu.Item>
                    } content='New note' inverted />
                </Menu>

                <Menu attached="bottom" vertical className="notes-menu">
                    <Menu.Item name="promotions" onClick={() => {}}>
                        <Header as="h4">Promotions</Header>
                        <p>Check out our new promotions</p>
                    </Menu.Item>

                    <Menu.Item name="coupons" onClick={() => {}}>
                        <Header as="h4">Coupons</Header>
                        <p>Check out our collection of coupons</p>
                    </Menu.Item>

                    <Menu.Item name="rebates" onClick={() => {}}>
                        <Header as="h4">Rebates</Header>
                        <p>Visit our rebate forum for information on claiming rebates</p>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
});