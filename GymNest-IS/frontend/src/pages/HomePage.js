// HomePage.js
import React from 'react';
// import AuthForm from '../components/AuthForm';
import PrivateSchedules from '../components/./schedule/PrivateSchedules';
import PublicSchedules from '../components/./schedule/PublicSchedules';

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