import React, { useState, useEffect } from 'react';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components';
import { Route, Link, Switch } from 'react-router-dom';
import { Display } from './Components/Display/Display';
import { Form } from './Components/Form';

const production = false;

export default function App() {
	const url = production
		? 'https://wellness-tracker-mern.herokuapp.com/'
		: 'http://localhost:2008/';

	const [activities, setActivities] = useState([]);
	const [days, setDays] = useState([]);
	const [currentUser, setCurrentUser] = useState({
		email: 'tostones64@hotmail.com',
		token:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvc3RvbmVzNjRAaG90bWFpbC5jb20iLCJpYXQiOjE2MDM2NzIzNzZ9.pKu3uhw7t5Igl5smcIz8AuCJeTySdiBiM9AGPWOcqJA',
	});

	const emptyUser = {
		email: '',
		password: '',
	};

	const [formUser, setFormUser] = useState(emptyUser);

	const emptyActivity = {
		date: '',
		activity_type: '',
		activity_mins: 0,
		rating: 0,
	};

	const [selectedActivity, setSelectedActivity] = useState(emptyActivity);

	// enter a username as param here once form exists
	const handleSignUp = async (newUser) => {
		try {
			const user = await fetch(url + 'auth/signup', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newUser),
			});
			const response = await user.json();
			console.log(response);
			const data = await response.data;
			console.log('user: ', data.email);
			setCurrentUser(data.email);
		} catch (err) {
			console.log(err);
		}
	};

	/// function to log a user in from the login form
	const handleLogIn = async (user) => {
		try {
			const loggedIn = await fetch(url + 'auth/login', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			});
			const response = await loggedIn.json();
			// if the user logged in successfully...
			if (response.status === 200) {
				const newUser = await response;
				console.log('currentUser: ', newUser);
				// set current user to newly logged in user
				await setCurrentUser(newUser);
				//get activities of the new user
				getActivities(newUser);
				// if there was an error with the login...
			} else {
				// if there's some sort of error from the server (e.g. wrong pw, no user found, send an alert and try again)
				alert(`Woops! ${response.error} Please try again`);
				// reload the page to clear form and avoid getting a React error
				document.location.reload();
			}
		} catch (err) {
			alert(`Error: ${err}. Please try again`);
			document.location.reload();
		}
	};

	const handleUserSubmit = (e) => {
		e.preventDefault();
		handleLogIn(formUser);
		getActivities(currentUser);
		setFormUser(emptyUser);
	};

	const getActivities = (currentUser) => {
		fetch(url + 'api/activity/', {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `bearer ${currentUser.token}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('b4 state ', data.data);
				setActivities(data.data);
			});
		console.log('currentUser activities: ', activities);
	};

	const getDays = () => {
		fetch(url + 'api/day/')
			.then((response) => response.json())
			.then((data) => {
				setDays(data.data);
			});
	};

	const handleCreate = (newActivity) => {
		// console.log({ date: newActivity.date, activities: [newActivity] });
		fetch(url + 'api/activity/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newActivity),
		})
			.then(() => {
				getActivities(currentUser);
			})
			.then(() => {});
	};

	// /// THIS HANDLE CREATE IS TO create for BOTH DAY AND ACTIVITY MODELS and then push the activity to the day model to the prop 'activities'
	// // right now, the date displayed on the screen is just the created_at date for each activity
	// const handleCreate2 = (newActivity, date) => {
	// 	const promiseArray = [
	// 		fetch(url + 'api/activity/', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify(newActivity),
	// 		}),
	// 		fetch(url + `api/day/`, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify(newActivity.date),
	// 		}),
	// 	];
	// 	Promise.all(promiseArray).then((responses) => {
	// 		responses
	// 			.map((response) => {
	// 				return response.json();
	// 			})
	// 			.then((dataObjects) => {
	// 				setActivities(dataObjects.data[0]);
	// 				setDays(dataObjects.data[1]);
	// 			});
	// 	});
	// };

	const handleUserChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setFormUser({ ...formUser, [key]: value });
		console.log('formUser, ', formUser);
	};

	const handleUpdate = (activity) => {
		fetch(url + 'api/activity/' + activity._id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(activity),
		}).then(() => {
			getActivities(currentUser);
		});
	};

	const selectActivity = (activity) => {
		setSelectedActivity(activity);
	};

	const deleteActivity = (activity) => {
		fetch(url + 'api/activity/' + activity._id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application.json',
			},
		}).then(() => {
			getActivities(currentUser);
		});
	};

	useEffect(() => {
		getActivities(currentUser);
		// getDays();
	}, []);

	return (
		<div className='App'>
			<h1>What did you do to stay well today?</h1>
			<Link to='/create'>
				<button className='button is-info is-light'>Add a new activity</button>
			</Link>
			<Switch>
				<Route
					exact
					path='/'
					render={(rp) => (
						<>
							<Display
								currentUser={currentUser.email}
								activities={activities}
								days={days}
								deleteActivity={deleteActivity}
								selectActivity={selectActivity}
								{...rp}
							/>
							{/* ////// LOG IN FORM /////// */}
							<br></br>
							<h2>Log in</h2>
							<form onSubmit={handleUserSubmit}>
								<input
									type='email'
									name='email'
									placeholder='email'
									value={formUser.email}
									onChange={handleUserChange}
								/>
								<input
									type='password'
									name='password'
									placeholder='password'
									value={formUser.password}
									onChange={handleUserChange}
								/>
								<input type='submit' />
							</form>
							{/* ////// END LOG IN FORM /////// */}
						</>
					)}
				/>
				<Route
					path='/create'
					render={(rp) => (
						<Form
							{...rp}
							activity={emptyActivity}
							handleSubmit={handleCreate}
						/>
					)}
				/>
				<Route
					exact
					path='/edit'
					render={(rp) => (
						<Form
							{...rp}
							label='update'
							activity={selectedActivity}
							handleSubmit={handleUpdate}
						/>
					)}
				/>
				<Route path='/delete' render={(rp) => <Display {...rp} />} />
			</Switch>
		</div>
	);
}
