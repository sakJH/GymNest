// HomePage.js
import React from 'react';
// import AuthForm from '../components/AuthForm';
import PrivateSchedules from '../components/schedules/PrivateSchedules';
import PublicSchedules from '../components/schedules/PublicSchedules';

function HomePage() {
	return (
			<div>
					{/*<AuthForm />*/}
					<PrivateSchedules/>
					<PublicSchedules />
			</div>
	);
}

export default HomePage;