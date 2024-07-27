const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String
    }
})

employeeSchema.pre('save', async function (next) {
    const emp = this;

    if (!emp.isModified('password')) return next();
    try {
        // generating salt
        const salt = await bcrypt.genSalt(10);

        // generate hash password
        const hashPass = await bcrypt.hash(emp.password, salt);
        emp.password = hashPass;
        next();
    } catch (err) {
        return next(err);
    }
})

employeeSchema.methods.comparePassword = async function(givenPassword) {
    try {
        const isMatch = await bcrypt.compare(givenPassword, this.password);
        console.log(isMatch);
        return isMatch;
    } catch(err) {
        throw err;
    }
} 

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;