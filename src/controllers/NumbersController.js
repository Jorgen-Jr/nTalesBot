const numbersapi = require('../services/numbersapi');

module.exports = {
    async trivia(number) {
        const trivia = await numbersapi.get(number)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return 'Is a boring number'
        });
        
        return trivia;
    },

    async math(number) {
        const math = await numbersapi.get(number + '/math')
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return 'Is a boring number'
        });

        return math;
    },
    async date(date) {
        const dateFact = await numbersapi.get(date + '/date')
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return 'Is a boring number'
        });
        
        return dateFact;
    },
    async year(year) {
        const yearFact = await numbersapi.get(year + '/year')
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return 'Is a boring number'
        });

        return yearFact;
    },
}