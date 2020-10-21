import React from 'react';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components';
import { Route, Link, Switch } from 'react-router-dom';
import { Display } from './Components/Display';

function App() {
	return (
		<div className='App'>
			<h1>What did you do to stay well today?</h1>
			<Link to='/create'>
				<Button color='info is-light'>Add an activity</Button>
			</Link>
			<Switch>
				<Route exact path='/' render={(rp) => <Display {...rp} />} />
				<Route path='/create' />
				<Route path='/delete' />
			</Switch>
		</div>
	);
}

export default App;
