const express = require('express');
const sequelize = require('./sequelize');

require('./models/User'); // Import modelu User
require('./models/Profile'); // Import modelu Profile

const userRoutes = require('./routes/userRoutes'); // Import rout
const profileRoutes = require('./routes/profileRoutes');
const roleRoutes = require('./routes/roleRoutes')

const User = require('./models/User');
User.hasOne(Profile, { foreignKey: 'userId', as: 'profile' });
Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', profileRoutes);
app.use('/api', roleRoutes);

// Synchronizace modelů s databází a nastavení asociací
sequelize.sync({ force: false }).then(() => {
    // Nastavení asociací
    const { User, Profile } = sequelize.models;
    User.hasOne(Profile, { foreignKey: 'userId', as: 'profile' });
    Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

    console.log('Databáze a tabulky byly synchronizovány');

    app.listen(PORT, () => {
        console.log(`Server běží na portu ${PORT}`);
    });
}).catch(err => console.error('Při synchronizaci databáze došlo k chybě:', err));
