const mongoose = require('mongoose');

require('dotenv').config();

const uri = (process.env.ATLAS_URI );

mongoose
	.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
	.catch(e => {
		console.error('Connection error ', e.message);
	});

const db = mongoose.connection;

db.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

module.exports = db;