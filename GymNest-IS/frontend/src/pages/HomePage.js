// HomePage.js
import React from 'react';
import PrivateSchedules from '../components/./schedule/PrivateSchedules';
import PublicSchedules from '../components/./schedule/PublicSchedules';
import UserNotifications from '../components/user/UserNotifications';
import UserInfo from '../components/user/UserInfo';

function HomePage() {
	return (
			<div>
					<UserInfo />
					<UserNotifications />
					<PrivateSchedules />
					<PublicSchedules />
			</div>
	);
}

export default HomePage;