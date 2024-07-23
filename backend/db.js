require('dotenv').config();
const mongoose = require('mongoose');

const MongoURL = process.env.DB_URL;

mongoose.connect(MongoURL);
const db = mongoose.connection;

db.on('connected', () => {
    console.log('connected with database Successfully!');
});

db.on('error', () => {
    console.log('error occured during the connection with DataBase!');
});

db.on('disconnected', () => {
    console.log('disconnected with database successfully');
});

module.exports = db;