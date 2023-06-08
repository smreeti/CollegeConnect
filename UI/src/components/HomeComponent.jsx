import React from 'react';

import fetchData from "../../utils/FetchAPI.js";
import Header from '../Header.jsx';
import { getLoggedInUser } from '../../utils/Auth.js';

export default class HomeComponent extends React.Component {

    constructor() {
        super();
        this.state = {};
        this.fetchProtectedPage = this.fetchProtectedPage.bind(this);
    }

    componentDidMount() {
        this.fetchProtectedPage();
    }

    async fetchProtectedPage() {
        try {
            const data = await fetchData("http://localhost:4000/protected", "POST");
            console.log(data);
        } catch (error) {
            console.log("Error:", error);
        }
    }

    render() {
        return (
            <>
                <Header />
                <h1>Welcome to Home page, {getLoggedInUser()}</h1>
            </>
        );
    }
}
