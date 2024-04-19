const axios = require('axios');

class CurrencyConverter {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = 'https://api.exchangerate-api.com/v4/latest/';
    }

    async convert(fromCurrency, toCurrency, amount) {
        const response = await axios.get(`${this.apiUrl}${fromCurrency}`, {
            params: {
                access_key: this.apiKey,
            },
        });

        const rate = response.data.rates[toCurrency];
        return amount * rate;
    }
}

module.exports = CurrencyConverter;
