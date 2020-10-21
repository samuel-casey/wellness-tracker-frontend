import React, { useState, useEffect } from 'react';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components';
import { Route, Link, Switch } from 'react-router-dom';
import { Display } from './Components/Display/Display';
import { Form } from './Components/Form';

const production = true;

function App() {
	const url = production
		? 'https://wellness-tracker-mern.herokuapp.com/'
		: 'http:://localhost:3001';

	const [activities, setActivities] = useState([]);

	const emptyActivity = {
		activity_type: '',
		activity_mins: 0,
		rating: 0,
	};

	const [selectedActivity, setSelectedActivity] = useState(emptyActivity);

	const getActivities = () => {
		fetch(url + 'api/activity/')
			.then((response) => response.json())
			.then((data) => {
				setActivities(data.data);
			});
	};

	const handleCreate = (newActivity) => {
		fetch(url + 'api/activity/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newActivity),
		}).then(() => {
			getActivities();
		});
	};

	useEffect(() => {
		getActivities();
	}, []);

	return (
		<div className='App'>
			<h1>What did you do to stay well today?</h1>
			<Link to='/create'>
				<Button color='info is-light'>Add a new activity</Button>
			</Link>
			<Switch>
				<Route
					exact
					path='/'
					render={(rp) => <Display activities={activities} {...rp} />}
				/>
				<Route
					path='/create'
					render={(rp) => <Form {...rp} handleSubmit={handleCreate} />}
				/>
				<Route path='/delete' render={(rp) => <Display {...rp} />} />
			</Switch>
		</div>
	);
}

export default App;
