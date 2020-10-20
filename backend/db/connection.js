// Environmental Variables
require('dotenv').config();

// Mongoose Connection
const { MONGO_DB_URI } = process.env;
const mongoose = require('mongoose');
const config = { useUnifiedTopology: true, useNewUrlParser: true };
const DB = mongoose.connection;

mongoose.connect(MONGO_DB_URI, config);

DB.on('open', () => console.log('Connected to Mongo'))
	.on('close', () => console.log('Disconnected from Mongo'))
	.on('error', (err) => console.log(err));

module.exports = mongoose;
