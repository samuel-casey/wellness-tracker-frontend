const express = require('express');

const router = express.Router();

const Activity = require('../models/activity');
const Day = require('../models/day');

const { index, show } = require('./mongoActions');

router.get('/', async (req, res) => {
	try {
		const activities = await index(Activity);
		res.json({
			status: 200,
			message: 'OK',
			data: activities,
		});
	} catch (err) {
		console.log(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const activities = await show(Activity, req.params.id);
		res.json({
			status: 200,
			message: 'OK',
			data: activities,
		});
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
