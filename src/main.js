const fs = require('fs');
const path = require('path')
const {minutesPassed, fetchRates} = require(path.resolve(__dirname, 'utils.js'))
const ratesPath = path.resolve(__dirname, 'rates.json')
const CACHE_TIME_IN_MINUTES = 60

module.exports = async () => {
    const cachedRates = require(ratesPath);
    const timeDiff = minutesPassed(cachedRates.timestamp)
    const returnCache = timeDiff < CACHE_TIME_IN_MINUTES

    if (returnCache) return cachedRates

    const newRates = await fetchRates(true)

    fs.writeFile(ratesPath, JSON.stringify(newRates), () => {});

    return newRates
}
