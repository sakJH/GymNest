const express = require('express');
const sequelize = require('./sequelize');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./utils/swaggerDefinition');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const initialData = require('./utils/dataInitializer');

// Import rout
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes')
const authRoutes = require('./routes/authRoutes');

// Import passportu a jeho konfigurace
const passport = require('passport');
const {initializeData} = require("./utils/dataInitializer");
require('./auth/passportConfig')(passport);

const app = express();
app.use(morgan('dev'));
app.use(cors());

const PORT = process.env.PORT || 3001;

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', roleRoutes);
app.use(passport.initialize());

// Middleware pro logování autorizačního headeru
app.use((req, res, next) => {
    console.log('Authorization Header:', req.headers.authorization);
    next();
});

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
sequelize.sync({ force: false }).then(async () => {

    await initialData.initializeData()
    console.log('Databáze a tabulky byly synchronizovány');

}).catch(err => console.error('Při synchronizaci databáze došlo k chybě:', err));

