const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const { PORT, MONGO_URI, SESSION_SECRET } = require('./config/index');

const authRoutes = require('./routes/api/auth');
const userRoutes = require('./routes/api/user');

// allow requests from client with session cookies
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// allow large playlists to be saved
app.use(bodyParser.json({limit: "50mb"}));

// save session to MongoDB to access resources
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
app.use(session({
    name: 'SID',
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60 * 60
    })
}));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log('server is running on port: ' + PORT);
});
