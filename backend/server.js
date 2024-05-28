const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session'); // Import express-session

const { pgClient } = require('./config');
const { validateUser } = require('./auth');
const loginHandler = require('./api/login');
const logoutRouter = require('./api/logout');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: '475897458923we234@#$@2234213', // Change this to a secure random string
    resave: false,
    saveUninitialized: false,
}));

app.post('/api/login', loginHandler);

app.post('/api/logout', logoutRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
