import React from 'react';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components';
import { Route, Link, Switch } from 'react-router-dom';
import { Display } from './Components/Display/Display';
import { Form } from './Components/Form';

function App() {
	return (
		<div className='App'>
			<h1>What did you do to stay well today?</h1>
			<Link to='/create'>
				<Button color='info is-light'>Add a new activity</Button>
			</Link>
			<Switch>
				<Route exact path='/' render={(rp) => <Display {...rp} />} />
				<Route path='/create' render={(rp) => <Form {...rp} />} />
				<Route path='/delete' render={(rp) => <Display {...rp} />} />
			</Switch>
		</div>
	);
}

export default App;
