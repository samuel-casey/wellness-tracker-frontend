import React, { useState, useEffect, createContext, useContext } from 'react';
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

	const emptyUser = {
		email: '',
		password: '',
		confirmPassword: '',
	};

	const demoUser = {
		email: 'scasey5@babson.edu',
		password: 'milk',
	};

	const [currentUser, setCurrentUser] = useState(emptyUser);

	// the user object for the sign in form
	const [signInFormUser, setSignInFormUser] = useState(emptyUser);
	// the user object for the sign up form
	const [signUpFormUser, setSignUpFormUser] = useState(emptyUser);

	const defaultActivity = {
		activity_type: 'Meditation',
		activity_mins: 1,
		rating: 5,
	};

	const [selectedActivity, setSelectedActivity] = useState(defaultActivity);

	// enter a username as param here once form exists
	const handleSignUp = async (newUser) => {
		console.log('newUser  ', newUser);
		try {
			const user = await fetch(url + 'auth/signup', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newUser),
			});
			const response = await user.json();
			if (response.status === 200) {
				const data = await response.data;
				// if log in successful, log in the new user
				await handleLogIn(newUser);
				// clear sign up form
				setSignUpFormUser(emptyUser);
			} else {
				// log error if error & refresh
				alert(response.error.error);
				document.location.reload();
			}
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

	///////////// Handle Submit function for log in form //////////////
	const handleUserSubmit = (e) => {
		e.preventDefault();
		handleLogIn(signInFormUser);
		getActivities(currentUser);
		setSignInFormUser(emptyUser);
	};

	const handleUserSignUp = (e) => {
		e.preventDefault();
		if (signUpFormUser.password === signUpFormUser.confirmPassword) {
			const newUser = {
				email: signUpFormUser.email,
				password: signUpFormUser.password,
			};
			handleSignUp(newUser);
		} else {
			alert('Woops! Your passwords do not match. Please try again.');
			document.location.reload();
		}
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
		fetch(url + 'api/activity/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `bearer ${currentUser.token}`,
			},
			body: JSON.stringify(newActivity),
		}).then(() => {
			getActivities(currentUser);
		});
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

	///////////// Handle Change function for log in form //////////////
	const handleUserChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setSignInFormUser({ ...signInFormUser, [key]: value });
	};

	const handleNewUserChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setSignUpFormUser({ ...signUpFormUser, [key]: value });
	};

	const handleUpdate = (activity) => {
		console.log('update handlah', activity);
		fetch(url + 'api/activity/' + selectedActivity._id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `bearer ${currentUser.token}`,
			},
			body: JSON.stringify(activity),
		}).then(() => {
			getActivities(currentUser);
		});
	};

	const handleSignOut = () => {
		setCurrentUser(emptyUser);
		console.log('signed out - ', currentUser);
	};

	const selectActivity = (activity) => {
		console.log(activity._id);
		setSelectedActivity(activity);
	};

	const deleteActivity = (activity) => {
		fetch(url + 'api/activity/' + activity._id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application.json',
				Authorization: `bearer ${currentUser.token}`,
			},
		}).then(() => {
			getActivities(currentUser);
		});
	};

	useEffect(() => {
		handleLogIn(demoUser);
		getActivities(currentUser);
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
									value={signInFormUser.email}
									onChange={handleUserChange}
								/>
								<input
									type='password'
									name='password'
									placeholder='password'
									value={signInFormUser.password}
									onChange={handleUserChange}
								/>
								<input type='submit' />
							</form>
							{/* ////// END LOG IN FORM /////// */}

							{/* ////// Sign Up FORM /////// */}
							<br></br>
							<h2>Sign up</h2>
							<form onSubmit={handleUserSignUp}>
								<input
									type='email'
									name='email'
									placeholder='email'
									value={signUpFormUser.email}
									onChange={handleNewUserChange}
								/>
								<input
									type='password'
									name='password'
									placeholder='password'
									value={signUpFormUser.password}
									onChange={handleNewUserChange}
								/>
								<input
									type='password'
									name='confirmPassword'
									placeholder='confirm password'
									value={signUpFormUser.confirmPassword}
									onChange={handleNewUserChange}
								/>
								<input type='submit' />
							</form>
							{/* ////// Sign up FORM /////// */}

							{/* ////// Sign out BTN /////// */}
							<button onClick={() => handleSignOut()}>Sign Out</button>
							{/* ////// END Sign out BTN /////// */}
						</>
					)}
				/>
				<Route
					path='/create'
					render={(rp) => (
						<Form
							{...rp}
							activity={defaultActivity}
							handleSubmit={handleCreate}
							currentUser={currentUser.email}
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
							currentUser={currentUser.email}
						/>
					)}
				/>
				<Route path='/delete' render={(rp) => <Display {...rp} />} />
			</Switch>
		</div>
	);
}
