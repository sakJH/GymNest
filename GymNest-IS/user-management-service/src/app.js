const express = require('express');
const sequelize = require('./sequelize'); // Náš upravený sequelize.js
require('./models/User'); // Import modelu User
require('./models/Profile'); // Import modelu Profile
const userRoutes = require('./routes/userRoutes'); // Import rout

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes);

// Synchronizace modelů s databází a nastavení asociací
sequelize.sync({ force: false }).then(() => {
    // Nastavení asociací
    const { User, Profile } = sequelize.models;
    User.hasOne(Profile, { foreignKey: 'userId', as: 'profile' });
    Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

    console.log('Databáze a tabulky byly úspěšně synchronizovány');

    app.listen(PORT, () => {
        console.log(`Server běží na portu ${PORT}`);
    });
}).catch(err => console.error('Při synchronizaci databáze došlo k chybě:', err));
