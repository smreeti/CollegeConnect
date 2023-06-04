import React from 'react';

import fetchData from "../../utils/FetchAPI.js";

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
            <main>
                <h1>Welcome to Home page</h1>
            </main>
        );
    }
}
