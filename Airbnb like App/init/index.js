const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listings.js")
const mongoUrl = "mongodb://127.0.0.1:27017/nomadtrip";

main().then((res) => {
    console.log("Connected to the Database");
}).catch((err) => {
    console.log("Error connecting with Database: ", err);
})

async function main() {
    await mongoose.connect(mongoUrl);
}

const initDb = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner : '6740c5c722f2772643fe4334'}));
    await Listing.insertMany(initData.data);
    console.log("Database Initialized");
};

initDb();