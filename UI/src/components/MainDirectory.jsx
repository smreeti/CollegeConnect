import React from 'react';
import LoginComponent from './LoginComponent.jsx';
import SignupComponent from './SignupComponent.jsx';
import Footer from '../Footer.jsx';

export default class MainDirectory extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <main>
                {/* <LoginComponent /> */}
                <SignupComponent />
                <Footer />

            </main>
        );
    }
}
