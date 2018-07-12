import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

import Auth from '../../stores/Auth';
import Api from '../../helpers/Api';

export default Auth.subscribe(
    class extends Component {
        state = { email: '', password: '' };

        handleChange = (e, { name, value }) => this.setState({ [name]: value });

        handleSubmit = () => {
            Api.post(`auth/login`, this.state).then(({ status, data }) => {
                Auth.set({
                    logged_in: true,
                    user: data.data,
                    access_token: data.meta.access_token
                });
                this.redirectIfLoggedIn();
            });
        };

        componentWillMount = () => this.redirectIfLoggedIn();

        redirectIfLoggedIn() {
            if (this.props.logged_in) {
                this.props.history.push('/notes');
            }
        }

        render() {
            const { email, password } = this.state;

            return (
                <Segment basic>
                    <h1>Login</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Input
                            name="email"
                            label="Email"
                            type="text"
                            value={email}
                            onChange={this.handleChange}
                            required
                        />
                        <Form.Input
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={this.handleChange}
                            required
                        />
                        <Button type="submit">Submit</Button>
                    </Form>
                </Segment>
            );
        }
    }
);
