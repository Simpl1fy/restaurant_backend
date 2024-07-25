const db = require('./db.js');
const express = require('express')
const app = express()
require("dotenv").config();
const passport = require('passport');
const localStratergy = require('passport-local').Strategy;

const bodyParser = require('body-parser');
app.use(bodyParser.json());    // data is stored in req.body

const PORT = process.env.PORT || 3000;

const Employee = require('./Models/employee.js');

// api

// Creating a middleware to log request
const logRequest = (req, res, next) => {
	console.log(`[${new Date().toLocaleString()}] Request hit in: ${req.originalUrl}`);
	next();
}

// using middleware
app.use(logRequest);

// using passort-local for user authentication
passport.use(new localStratergy(async (USERNAME, PASSWORD, done) => {
	try {
		// authentication logic
		const user = await Employee.findOne({username: USERNAME});
		if(!user) {
			return done(null, false, {'mesage': 'Incorrect Username'});
		}
		const isPasswordMatch = user.password === PASSWORD ? true: false;
		if(isPasswordMatch) {
			return done(null, user, {'message': 'Authentication Succesful'});
		} else {
			return done(null, false, {'message': 'Incorrect Password'});
		}
	} catch(err) {
		done(err)
	}
}))

app.use(passport.initialize());

const localAppAuthentication = passport.authenticate('local', {session: false});

app.get('/', function (req, res) {
	res.send('Welcome to our restaurant, how may I help you?');
})

// importing the employee routes
const employeeRoutes = require('./routes/employeeRoutes');
app.use('/employee', localAppAuthentication, employeeRoutes);

// importing the menu routes
const menuRoutes = require('./routes/menuRoutes.js');
app.use('/menu', menuRoutes);

app.listen(PORT, () => {
	console.log("Listening to port 3000, and server is online");
})