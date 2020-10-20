const mongoose = require('../db/connection');

const index = (collection) => {
	return collection.find();
};

const show = (collection, id) => {
	return collection.findById(id);
};

module.exports = { index, show };
