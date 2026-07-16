const express = require('express');
const app = express();

__path = process.cwd();

const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;

let server = require('./qr'),
    code = require('./pair');

require('events').EventEmitter.defaultMaxListeners = 500;

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/qr', server);
app.use('/code', code);

// Pair Page
app.get('/pair', async (req, res) => {
    res.sendFile(__path + '/pair.html');
});

// Home Page
app.get('/', async (req, res) => {
    res.sendFile(__path + '/main.html');
});

// Start Server
app.listen(PORT, () => {
    console.log(`
Don't Forget To Give Star Dark-Bot ⭐

Server running on http://localhost:${PORT}
`);
});

module.exports = app;