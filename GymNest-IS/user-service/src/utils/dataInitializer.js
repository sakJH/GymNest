// utils/dataInitializer.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function createInitialUser(username, password, email, firstName, lastName, roleId, credits) {
    try {
        const exists = await User.findOne({ where: { username } });

        if (!exists) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                username,
                passwordHash: hashedPassword,
                email,
                firstName,
                lastName,
                roleId,
                credits
            });

            console.log('Initial user created:', username);
        } else {
            console.log('Initial user already exists:', username);
        }
    } catch (error) {
        console.error('Failed to create initial user:', error);
    }
}

async function initializeData() {
    // List of initial users to create
    const users = [
        { username: 'admin', password: 'Test_admin1', email: 'admin@email.com', firstName: 'Ada', lastName: 'Adida', roleId: 4, credits: 1000 },
        { username: 'coach', password: 'Test_coach1', email: 'coach@email.com', firstName: 'Cach', lastName: 'CocaCola', roleId: 3, credits: 500 },
        { username: 'member', password: 'Test_member1', email: 'member@email.com', firstName: 'Martin', lastName: 'Merino', roleId: 2, credits: 800 },
        { username: 'user', password: 'Test_user1', email: 'user@email.com', firstName: 'Usalam', lastName: 'Upatla', roleId: 1, credits: 700 }
    ];

    // Create each initial user
    for (const user of users) {
        await createInitialUser(user.username, user.password, user.email, user.firstName, user.lastName, user.roleId, user.credits);
    }
}

module.exports = {
    initializeData
};
