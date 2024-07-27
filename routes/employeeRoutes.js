const express = require('express');
const router = express.Router();

const {jwtAuthMiddleware, generateToken} = require('./../jwt');

const Employee = require('./../Models/employee');

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newEmp = new Employee(data);
        const response = await newEmp.save();
        console.log("Data has been saved");

        // consoling to see the response as well
        // console.log(JSON.stringify(response));

        // creating a payload object to give to the token generator
        const payload = {
            id: response.id,
            username: response.username
        }

        const token = generateToken(payload);
        console.log("Token has been generated");
        console.log("Token: " + token);

        res.status(200).json({response: response, token: token});
    } catch(err) {
        console.log("error occured: " + err);
        res.status(500).json({"error": "Internal Server Error"});
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await Employee.find();
        console.log("Data fetched from the database");
        res.status(200).json(data);
    } catch(err) {
        console.log("error: " + err);
        res.status(500).json({"error": "Internal Server Error"});
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        work = ['Chef', 'Manager', 'aiter'];
        if (work.includes(workType)) {
            const response = await Employee.find({work: workType});
            console.log("Data has been fetched");
            res.status(200).json(response);
        } else{
            res.status(404).json({"Error": "Invalid Work Type"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({"Error": "Internal Server Error"});
    }
})

router.put('/:id', async(req, res) => {
    try {
        const personId = req.params.id;
        const updateData = req.body;
        const response = await Employee.findByIdAndUpdate(personId, updateData, {
            new: true,
            runValidators: true
        })
        if(!response) {
            return res.status(404).json({"Error": "Employee not found"});
        }
        console.log("data updated");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({"Error": "Internal Server Error"});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Employee.findByIdAndDelete(personId);
        if(!response) {
            return res.status(404).json({"Error": "Employee not found"});
        }
        console.log("Data has been deleted");
        res.status(200).json({"Success": "Employee data has been successfully deleted"});
    } catch(err) {
        console.log(err);
        res.status(500).json({"error": "internal server error"});
    }
})

module.exports = router;