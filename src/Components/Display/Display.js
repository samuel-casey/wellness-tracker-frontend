import React from 'react';

export const Display = (props) => {
	const { activities, days, currentUser } = props;

	console.log('actividades, ', activities);

	/// THIS BLOCK WILL EVENTUALLY ADD AN EMOJI TO THE SCREEN BASED ON THE ACTIVITY'S RATING
	// activities.forEach((activity) => (activity.date = 'NULL'));
	// let emoji;
	// if (activities.length > 0) {
	// 	activities.forEach((activity) => {
	// 		console.log(activity.rating);
	// 		switch (true) {
	// 			case activity.rating === 1:
	// 				return (emoji = ":'(");
	// 			case activity.rating === 10:
	// 				return (emoji = ':(');
	// 			// 	break;
	// 			// case 3:
	// 			// 	emoji = ':|';
	// 			// 	break;
	// 			// case 4:
	// 			// 	emoji = ':)';
	// 			// 	break;
	// 			// case 5:
	// 			// 	emoji = ':D';
	// 			// 	break;
	// 			default:
	// 				emoji = '';
	// 		}
	// 	});
	// 	console.log(emoji);
	// }

	const loaded = (
		<div style={{ textAlign: 'center' }}>
			{currentUser}
			{activities.map((activity, index) => (
				<article className='message is-link' key={index}>
					<div className='message-header'>
						<p>Date: {new Date(activity.createdAt).toLocaleDateString()}</p>
						<button
							onClick={() => {
								props.deleteActivity(activity);
							}}
							className='delete'></button>
					</div>
					<div
						className='message-body'
						style={{
							display: 'flex',
							flexDirection: 'column',
							textAlign: 'left',
							lineHeight: '2',
						}}>
						<p>
							<span style={{ fontWeight: 'bold' }}>Activity: </span>
							{activity.activity_type}
						</p>
						<p>
							<span style={{ fontWeight: 'bold' }}>Duration: </span>
							{activity.activity_mins} mins
						</p>
						<p>
							<span style={{ fontWeight: 'bold' }}>Rating: </span>
							{activity.rating}
							{/* {emoji} */}
						</p>
						<button
							className='button is-primary is-light edit'
							onClick={() => {
								props.selectActivity(activity);
								props.history.push('/edit');
							}}>
							Edit
						</button>
					</div>
				</article>
			))}
		</div>
	);

	const loading = 'Loading...';

	return currentUser ? loaded : loading;
};
