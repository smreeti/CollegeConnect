require('dotenv').config();
const express = require('express');
const { dbConnect, seedInitialData } = require('./db/db.js');

const app = express();
const route = require('./routes/routes.js');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');

const port = process.env.API_SERVER_PORT || 4000;

/* middleware for serving static files to Express app */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded());

/*To Flush error messages from session*/
app.use(flash());
app.use(route);
app.use((req, res) => res.render('notfound')); //creating a 404 page for non-existing route


(async function () {
    try {
        //establish a connection to the MongoDB database server
        await dbConnect();

        //populate initial static employee data in the database
			await seedInitialData();

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