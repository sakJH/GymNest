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

// Import rout
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes')
const authRoutes = require('./routes/authRoutes');

// Import passportu a jeho konfigurace
const passport = require('passport');
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
sequelize.sync({ force: false }).then(() => {

    createInitialUser('admin', 'Test_admin1', 'admin@email.com', 'Ada', 'admin', 4, 1000).then(r => console.log('Inicial user created')).catch(err => console.error('Failed to create inicial user:', err));
    createInitialUser('coach', 'Test_coach1', 'coach@email.com', 'Cach', 'admin', 3, 500).then(r => console.log('Inicial user created')).catch(err => console.error('Failed to create inicial user:', err));
    createInitialUser('member', 'Test_member1', 'member@email.com', 'Martin', 'admin', 2, 800).then(r => console.log('Inicial user created')).catch(err => console.error('Failed to create inicial user:', err));
    createInitialUser('user', 'Test_user1', 'user@email.com', 'Usalam', 'admin', 1, 700).then(r => console.log('Inicial user created')).catch(err => console.error('Failed to create inicial user:', err));
    console.log('Databáze a tabulky byly synchronizovány');

}).catch(err => console.error('Při synchronizaci databáze došlo k chybě:', err));

//Inicial user

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

            console.log('Initial user created:', user);
        } else {
            console.log('Initial user already exists:', username);
        }
    } catch (error) {
        console.error('Failed to create initial user:', error);
    }
}
