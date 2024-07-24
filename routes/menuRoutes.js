const express = require('express');
const router = express.Router();

const Menu = require('./../Models/menu');

router.get('/', (req, res) => {
    res.send("This is the menu of the restaurant");
})

router.post('/put', async (req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new Menu(data);
        const response = await newMenuItem.save();
        console.log("Menu Item has been saved");
        res.status(200).json(response);
    } catch(err) {
        res.status(500).json({"Error": "Internal Server Error"});
    }
})

router.get('/show', async(req, res) => {
    try{
        const data = await Menu.find();
        console.log("Data has been fetched");
        res.status(200).json(data);
    } catch(err) {
        console.log(err);
        res.status(500).json({"Error": "Internal Server Error"});
    }
})

router.get('/:taste', async (req, res) => {
    try {
        var tasteRequired = req.params.taste;
        const taste = ['sweet', 'sour', 'spicy'];
        if (taste.includes(tasteRequired)) {
            tasteRequired = tasteRequired.charAt(0).toUpperCase() + tasteRequired.slice(1);
            const response = await Menu.find({taste: tasteRequired});
            console.log("data has been fetched");
            res.status(200).json(response);
        } else {
            res.status(404).json({"Error": "Taste not available"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({"Error": "Internal Server Error"});
    }
})

router.put('/:id', async(req, res) => {
    try {
        const itemId = req.params.id;
        const updateItem = req.body;
        const response = await Menu.findByIdAndUpdate(itemId, updateItem, {
            new: true,
            runValidators: true
        })
        if (!response) {
            return res.status(404).json({"Error": "Menu Item not found"});
        }
        console.log("Menu item has been updated");
        res.status(200).json(response);
    } catch(err) {
        console.log(err);
        res.status(500).json({"Error": "Internal Server Error"});
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const menuItem = req.params.id;
        const response = await Menu.findByIdAndDelete(menuItem);
        if (!response) {
            return res.status(404).json({"Error": "Menu Item not found"});
        }
        console.log("Menu item has been deleted");
        res.status(200).json({"Success": "Menu Item has been deleted"});
    } catch(err) {
        console.log(err);
        res.status(500).json({"Error": "Internal Server Error"});
    }
})

module.exports = router;