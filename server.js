const express = require('express');
const app = express();
const cors = require('cors');

const authRouter = require('./routes/auth');

app.use('/auth', authRouter);

require('dotenv').config();
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log('server is running on port: ' + process.env.PORT);
});