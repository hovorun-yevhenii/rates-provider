const request = require('request')
const KEY_PRIME = '4094e5dbb7d1407ea5ce2820c7a781ad'
const KEY_RESERVE = '027700360ab349d0b70f7d7098a8883d'

function minutesPassed(date) {
    const diff = (+new Date() - date) / 1000 / 60
    return Math.abs(Math.round(diff))
}

function fetchRates(prime) {
    return new Promise(resolve => {
        const BASE_URL = 'https://openexchangerates.org/api/'
        const KEY = prime ? KEY_PRIME : KEY_RESERVE
        const url = `${BASE_URL}latest.json?app_id=${KEY}`

        request.get({url, json: true}, (err, res, data) => {
            if (err || res.statusCode !== 200) {
                return fetchRates()
            } else {
                resolve({
                    base: data.base,
                    rates: data.rates,
                    timestamp: +new Date()
                })
            }
        })
    })
}

module.exports = {
    minutesPassed,
    fetchRates
}
