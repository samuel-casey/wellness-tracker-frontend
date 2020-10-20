const mongoose = require('../db/connection');

const index = (collection) => {
	return collection.find();
};

const show = (collection, id) => {
	return collection.findById(id);
};

const create = (collection, item) => {
	return collection.create(item);
};

const update = (collection, id, newItem) => {
	switch (collection.modelName) {
		case 'activity':
			return collection.findByIdAndUpdate(
				id,
				{
					activity_type: newItem.activity_type,
					activity_mins: newItem.activity_mins,
					rating: newItem.rating,
				},
				{ new: true }
			);
		// case Day:
		// 	return collection.findByIdAndUpdate(id, {});
		default:
			return null;
	}
};

const destroy = (collection, id, newItem) => {
	switch (collection.modelName) {
		case 'activity':
			return collection.findByIdAndDelete(id);
		// case Day:
		// 	return collection.findByIdAndUpdate(id, {});
		default:
			return null;
	}
};

module.exports = { index, show, create, update, destroy };
