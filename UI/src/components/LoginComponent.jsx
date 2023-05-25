import React from 'react';
import SignupComponent from './SignupComponent.jsx';

export default class LoginComponent extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <main>
                <h1>Login</h1>
                <SignupComponent />
            </main>
        );
    }
}
