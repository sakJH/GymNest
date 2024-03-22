const express = require('express');
const sequelize = require('./sequelize');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./utils/swaggerDefinition');

const User = require('./models/User'); // Import modelu User
const Profile =  require('./models/Profile'); // Import modelu Profile

const userRoutes = require('./routes/userRoutes'); // Import rout
const profileRoutes = require('./routes/profileRoutes');
const roleRoutes = require('./routes/roleRoutes')
const authRoutes = require('./routes/authRoutes');

const passport = require('passport');
require('./auth/passportConfig')(passport);

User.hasOne(Profile, { foreignKey: 'userId', as: 'profile' });
Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

const app = express();
const PORT = process.env.PORT || 3001;

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', profileRoutes);
app.use('/api', roleRoutes);
app.use('/api', authRoutes);
app.use(passport.initialize());

// Zpřístupnění Swagger UI na /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicializace passportu
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Přístup povolen' });
});

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
