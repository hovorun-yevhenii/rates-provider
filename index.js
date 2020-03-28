const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const handler = require(path.join(__dirname, 'src'))
const app = express()

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => res.json(handler())).listen(PORT)
