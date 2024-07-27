const db = require('./db.js');
const express = require('express')
const app = express()
require("dotenv").config();

const passport = require('./auth.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());    // data is stored in req.body

const PORT = process.env.PORT || 3000;

// api

// Creating a middleware to log request
const logRequest = (req, res, next) => {
	console.log(`[${new Date().toLocaleString()}] Request hit in: ${req.originalUrl}`);
	next();
}

// using middleware
app.use(logRequest);

// using passort-local for user authentication


app.use(passport.initialize());
const localAppAuthentication = passport.authenticate('local', {session: false});

app.get('/', function (req, res) {
	res.send('Welcome to our restaurant, how may I help you?');
})

// importing the employee routes
const employeeRoutes = require('./routes/employeeRoutes');
app.use('/employee', employeeRoutes);

// importing the menu routes
const menuRoutes = require('./routes/menuRoutes.js');
app.use('/menu', menuRoutes);

app.listen(PORT, () => {
	console.log("Listening to port 3000, and server is online");
})