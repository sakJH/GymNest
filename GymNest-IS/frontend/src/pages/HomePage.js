import React from 'react';
import AuthForm from '../components/AuthForm';
import PrivateSchedules from '../components/PrivateSchedules';
import PublicSchedules from '../components/PublicSchedules';

function HomePage() {
	return (
			<div>
					<AuthForm />
					<PrivateSchedules/>
					<PublicSchedules />
			</div>
	);
}

export default HomePage;