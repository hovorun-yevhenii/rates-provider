const express = require('express')
const path = require('path')
const getRates = require(path.join(__dirname, 'src/main'))

express().get('/', async (req, res) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.json(await getRates())
}).listen(process.env.PORT || 5000)
