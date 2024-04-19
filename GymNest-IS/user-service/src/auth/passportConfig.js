const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../models/User'); // Cesta k modelu User
const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');

dotenv.config();

module.exports = (passport) => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    };

    passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
        try {
            const user = await User.findByPk(jwt_payload.id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (error) {
            return done(error, false);
        }
    }));

    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                let user = await User.findOne({ where: { googleId: profile.id } });

                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        name: profile.displayName
                        // další potřebná pole podle vašeho modelu User
                    });
                }
                // Generování JWT tokenu
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

                cb(null, { user, token }); // Předání uživatele a tokenu do callbacku
            } catch (error) {
                cb(error, null);
            }
        }
    ));
};
