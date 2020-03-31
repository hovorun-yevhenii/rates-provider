const https = require('https');
const KEY_PRIME = '4094e5dbb7d1407ea5ce2820c7a781ad'
const KEY_RESERVE = '027700360ab349d0b70f7d7098a8883d'

function minutesPassed(date){
    const diff = (+new Date() - date) / 1000 / 60
    return Math.abs(Math.round(diff))
}

function fetchRates(prime) {
    return new Promise(resolve => {
        const BASE_URL = 'https://openexchangerates.org/api/'
        const KEY = prime ? KEY_PRIME : KEY_RESERVE

        https.get(`${BASE_URL}latest.json?app_id=${KEY}`, (res) => {
            res.on('data', data => {
                const response = JSON.parse(data.toString())
                const {base, rates} = response

                resolve({base, rates, timestamp: +new Date()})
            })
        }).on('error', () => {
            if (prime) {
                return fetchRates()
            }
        });
    })
}

module.exports = {
    minutesPassed,
    fetchRates
}
