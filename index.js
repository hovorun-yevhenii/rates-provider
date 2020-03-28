const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const handler = require(path.join(__dirname, 'src'))

express().get('/', (req, res) => res.json(handler())).listen(PORT)
