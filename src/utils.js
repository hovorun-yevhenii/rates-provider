const https = require('https');

function minutesPassed(date){
    const diff = (+new Date() - date) / 1000 / 60
    return Math.abs(Math.round(diff))
}

function fetchRates() {
    return new Promise(resolve => {
        const BASE_URL = 'https://openexchangerates.org/api/'
        const KEY = '4094e5dbb7d1407ea5ce2820c7a781ad'

        https.get(`${BASE_URL}latest.json?app_id=${KEY}`, (res) => {
            res.on('data', data => {
                const response = JSON.parse(data.toString())
                const {base, rates} = response

                resolve({base, rates, timestamp: +new Date()})
            })
        }).on('error', () => {
            // TODO handle limit error with another apiKey
        });
    })
}

module.exports = {
    minutesPassed,
    fetchRates
}
