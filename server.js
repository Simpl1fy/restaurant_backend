const db = require('./db.js');
const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());     // data is stored in req.body

const Employee = require('./Models/employee.js');
const Menu = require('./Models/menu.js');

// api

app.get('/', function (req, res) {
  res.send('Welcome to our restaurant, how may I help you?');
})

// importing the employee routes
const employeeRoutes = require('./routes/employeeRoutes');

// using the employee routes
app.use('/employee', employeeRoutes);

const menuRoutes = require('./routes/menuRoutes.js');
app.use('/menu', menuRoutes);

app.listen(3000, () => {
    console.log("Listening to port 3000, and server is online");
})