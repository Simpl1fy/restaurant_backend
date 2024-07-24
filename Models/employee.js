const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'manager', 'waiter'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        requied: true,
        unique: true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    }
})

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;