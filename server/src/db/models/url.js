const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	id: String,
	slug: String,
	destination: String,
	author: String,
	creationDate: Date,
	modifiedDate: Date,
});

const URL = mongoose.model("URL", schema);

module.exports = URL;
