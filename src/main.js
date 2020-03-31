const fs = require('fs');
const path = require('path')
const {minutesPassed, fetchRates} = require(path.resolve(__dirname, 'utils.js'))
const ratesPath = path.resolve(__dirname, 'rates.json')
const CACHE_TIME_IN_MINUTES = 60

module.exports = async () => {
    const cachedRates = require(ratesPath);
    const timeDiff = minutesPassed(cachedRates.timestamp)
    const shouldUpdate = timeDiff > CACHE_TIME_IN_MINUTES

    if (shouldUpdate) {
        const newRates = await fetchRates()

        fs.writeFile(ratesPath, JSON.stringify(newRates), () => {});

        return newRates
    } else {
        return cachedRates
    }
}
