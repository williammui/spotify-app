const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const path = require('path');

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
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// save session to MongoDB to access resources
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
let sessionConfig = {
    name: 'SID',
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60 * 60
    }),
    cookie: {
        secure: false,
        expires: new Date(Date.now() + 60 * 60 * 1000)
    }
}
app.use(session(sessionConfig));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    sessionConfig.cookie.secure = true;

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log('server is running on port: ' + PORT);
});
