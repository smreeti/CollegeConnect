import React from 'react';
import LoginComponent from './LoginComponent.jsx';
import SignupComponent from './SignupComponent.jsx';

export default class MainDirectory extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <main>
                <LoginComponent />
                <SignupComponent />
            </main>
        );
    }
}
