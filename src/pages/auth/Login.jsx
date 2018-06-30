import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

import Auth from '../../stores/Auth';
import Api from '../../helpers/Api';

export default Auth.subscribe(
    class extends Component {
        state = { email: '', password: '' };

        handleChange = (e, { name, value }) => this.setState({ [name]: value });

        handleSubmit = () => {
            let THIS = this;
            Api.post(`auth/login`, this.state).then(({ status, data }) => {
                Auth.setAndSave({
                    logged_in: true,
                    user: data.data,
                    access_token: data.meta.access_token
                });
                THIS.redirectIfLoggedIn();
            });
        };

        componentWillMount = () => this.redirectIfLoggedIn();

        redirectIfLoggedIn() {
            if (this.props.logged_in) {
                this.props.history.push('/my-notes');
            }
        }

        render() {
            const { email, password } = this.state;

            return (
                <div>
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
                </div>
            );
        }
    }
);
