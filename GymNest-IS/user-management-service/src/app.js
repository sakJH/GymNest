const express = require('express');
const sequelize = require('./sequelize');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./utils/swaggerDefinition');
require('dotenv').config();

//Konfigurace CORS
// const corsOptions = {
//     origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:3005'],
//     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     exposedHeaders: ['*'],
// };

const User = require('./models/User'); // Import modelu User
const Profile =  require('./models/Profile'); // Import modelu Profile

// Import rout
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const roleRoutes = require('./routes/roleRoutes')
const authRoutes = require('./routes/authRoutes');

// Import passportu a jeho konfigurace
const passport = require('passport');
require('./auth/passportConfig')(passport);


User.hasOne(Profile, { foreignKey: 'userId', as: 'profile' });
Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

const app = express();
const PORT = process.env.PORT || 3001;
// app.use(cors(corsOptions));

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
