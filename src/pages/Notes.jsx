import React, { Component } from 'react';
import { Header, Menu, Popup, Icon, Grid, Segment } from 'semantic-ui-react';

import Note from "../stores/Note";

export default Note.subscribe(class extends Component {

    componentWillMount() {
        Note.fetch();
    }

    render() {
        return (
            <div>
                <Grid>
                    <Grid.Column width={4}>

                        <Menu attached='top'>
                            <Popup trigger={
                                <Menu.Item onClick={() => {}}>
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
                    </Grid.Column>

                    <Grid.Column width={12}>
                        <Segment>Note content</Segment>
                    </Grid.Column>
                </Grid>

            </div>
        );
    }
});