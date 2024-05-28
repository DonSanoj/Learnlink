const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { pgClient } = require('./config');
const { validateUser } = require('./auth');
const loginHandler = require('./api/login');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/login', loginHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});