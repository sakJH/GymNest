const express = require('express');
const sequelize = require('./sequelize');

const User = require('./models/User'); // Import modelu User
const Profile =  require('./models/Profile'); // Import modelu Profile

const userRoutes = require('./routes/userRoutes'); // Import rout
const profileRoutes = require('./routes/profileRoutes');
const roleRoutes = require('./routes/roleRoutes')


User.hasOne(Profile, { foreignKey: 'userId', as: 'profile' });
Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', profileRoutes);
app.use('/api', roleRoutes);

app.listen(PORT, () => {
    console.log(`Server běží na portu ${PORT}`);
});

// Synchronizace modelů s databází a nastavení asociací
sequelize.sync({ force: false }).then(() => {
    // Nastavení asociací
    const { User, Profile } = sequelize.models;
    User.hasOne(Profile, { foreignKey: 'userId', as: 'profile' });
    Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

    console.log('Databáze a tabulky byly synchronizovány');


}).catch(err => console.error('Při synchronizaci databáze došlo k chybě:', err));
