const api = require('axios');

const numbersapi = api.create({
    baseURL: 'http://numbersapi.com/',
});

module.exports = numbersapi;