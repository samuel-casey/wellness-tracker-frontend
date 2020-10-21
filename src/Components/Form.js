import React, { useState } from 'react';

export const Form = (props) => {
	const [formData, setFormData] = useState(props.activity);

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [key]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent Form from Refreshing
		console.log(formData);
		props.handleSubmit(formData); // Submit to Parents desired function
		props.history.push('/'); //Push back to display page
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='field'>
				<div className='control'>
					<label className='label'>Day</label>
					<input className='input' type='date' placeholder='' />
				</div>
			</div>
			<div className='field'>
				<div className='control'>
					<label className='label'>Activity</label>
					<div
						className='select'
						value={
							formData.activity_type ? formData.activityType : 'Meditation'
						}>
						<select
							value={formData.activity_type}
							style={{ width: '50vw' }}
							name='activity_type'
							onChange={handleChange}>
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
					<input
						className='input'
						type='number'
						onChange={handleChange}
						name='activity_mins'
						value={formData.activity_mins}
						placeholder=''
					/>
				</div>
			</div>
			<div className='field'>
				<div className='control'>
					<label className='label'>How did you feel afterwards?</label>
					<div
						className='select'
						value={
							formData.activity_type ? formData.activityType : 'Meditation'
						}>
						<select
							value={formData.activity_type}
							style={{ width: '20vw' }}
							name='rating'
							onChange={handleChange}>
							<option>5</option>
							<option>4</option>
							<option>3</option>
							<option>2</option>
							<option>1</option>
						</select>
					</div>
				</div>
			</div>
			<div className='buttons'>
				<button className='is-info is-rounded is-fullwidth button' tabIndex='0'>
					Add
				</button>
			</div>
		</form>
	);
};
