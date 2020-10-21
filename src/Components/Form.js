import React, { useState } from 'react';

export const Form = (props) => {
	const [formData, setFormData] = useState({
		day: '',
		activity_type: '',
		activity_mins: 0,
		rating: 0,
	});
	const update = ({ target }) =>
		setFormData({ ...formData, [target.name]: target.value });

	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent Form from Refreshing
		props.handleSubmit(formData); // Submit to Parents desired function
		props.history.push('/'); //Push back to display page
	};

	return (
		<form onSubmit='handleSubmit'>
			<div className='field'>
				<div className='control'>
					<label className='label'>Day</label>
					<input className='input' type='date' placeholder='' />
				</div>
			</div>
			<div className='field'>
				<div className='control'>
					<label className='label'>Activity</label>
					<div className='select'>
						<select style={{ width: '50vw' }}>
							<option>Meditation</option>
							<option>Exercise</option>
							<option>Journaling</option>
							<option>Connecting with friends/family</option>
							<option>Other</option>
						</select>
					</div>
				</div>
			</div>
			<div className='field'>
				<div className='control'>
					<label className='label'>
						How many minutes did you spend doing this activity?
					</label>
					<input className='input' type='number' placeholder='' />
				</div>
			</div>
			<div className='field'>
				<div className='control'>
					<label className='label'>How did you feel afterwards?</label>
					<label className='radio'>
						<input type='radio' name='question' />1 :'(
					</label>
					<label className='radio'>
						<input type='radio' name='question' />2 :(
					</label>
					<label className='radio'>
						<input type='radio' name='question' />3 :|
					</label>
					<label className='radio'>
						<input type='radio' name='question' />4 :)
					</label>
					<label className='radio'>
						<input type='radio' name='question' />5 :D
					</label>
				</div>
			</div>
			<div className='buttons'>
				<button className='is-info is-rounded is-fullwidth button' tabindex='0'>
					Add
				</button>
			</div>
		</form>
	);
};
