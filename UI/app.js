require('dotenv').config();
const express = require('express');
// const proxy = require('http-proxy-middleware');
const app = express();

//adding a middleware for serving static files to the Express app
app.use(express.static('public'));

const port = process.env.UI_SERVER_PORT || 3000;

//app will start by listening on port 3000
app.listen(port, function () {
	console.log(`UI server started on the port: ${port}`);
});