const numbersapi = require('../services/numbersapi');

module.exports = {
    async trivia(number) {
        const trivia = await numbersapi.get(number + '?notfound=floor')
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return 'Is a boring number'
        });
        
        return trivia;
    },

    async math(number) {
        const math = await numbersapi.get(number + '/math?notfound=floor')
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return 'Is a boring number'
        });

        return math;
    },
    
    async date(date) {
        const dateFact = await numbersapi.get(date + '/date?notfound=floor')
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return 'Is a boring number'
        });
        
        return dateFact;
    },

    async year(year) {
        const yearFact = await numbersapi.get(year + '/year?notfound=floor')
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return 'Is a boring number'
        });

        return yearFact;
    },

    async triviaFragment(number) {
        const trivia = await numbersapi.get(number + '/trivia?fragment')
        .then(res => {
            if(res.data.startsWith(number)){
                return false;
            }else{
                return number + ' is ' + res.data;
            }
        })
        .catch(err => {
            return false;
        });
        
        return trivia;
    },
    async yearFragment(year) {
        const yearFact = await numbersapi.get(year + '/year?fragment')
        .then(res => {
            if(res.data.startsWith(number)){
                return false;
            }else{
                return 'At the year ' + year + ', ' + res.data;
            }
        })
        .catch(err => {
            return false;
        });

        return yearFact;
    },
}