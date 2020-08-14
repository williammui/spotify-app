require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    DEV_URI: process.env.DEV_URI,
    MONGO_URI: process.env.MONGO_URI,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SESSION_SECURE: process.env.SESSION_SECURE,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
    DASHBOARD_REDIRECT_URI: process.env.DASHBOARD_REDIRECT_URI,
    STATE: process.env.STATE,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    ENCRYPTION_ALGORITHM: process.env.ENCRYPTION_ALGORITHM,
    ENCRYPTION_ENCODING: process.env.ENCRYPTION_ENCODING
};