require('dotenv').config();
const express = require('express');
const { dbConnect } = require('./db/db.js');

const app = express();

const port = process.env.API_SERVER_PORT || 4000;

(async function () {
    try {
        //establish a connection to the MongoDB database server
        await dbConnect();

        //app will start by listening on port 4000
        app.listen(port, function () {
            console.log(`API server started on port ${port}`);
        });
    } catch (err) {
        console.log('ERROR:', err);
    }
}());

// app.get('/', (req, res) => {
//     console.log("home page")
// });

// app.get('/about', (req, res) => {
//     console.log("about page")
// });