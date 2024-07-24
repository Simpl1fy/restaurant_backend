const mongoose = require('mongoose');

const mongoURL = "mongodb://localhost:27017/restaurant";

// set up mongo database connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection; // use to connect nodejs to mongodb

db.on("connected", () => {
    console.log("Connected to mongo database");
})

db.on("error", (err)=> {
    console.log("There was a error: " + err);
})

db.on("disconnected", () => {
    console.log("Disconnected from the server");
})

module.exports = db;