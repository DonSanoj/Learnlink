const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const logoutRouter = require('./api/logout');
const registerUser = require('./api/register');
const loginRouter = require('./api/login');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: '475897458923we234@#$@2234213',
    resave: false,
    saveUninitialized: false,
}));

app.post('/api/register', registerUser);
app.use('/api', loginRouter); // Correctly mount loginRouter
app.post('/api/logout', logoutRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
