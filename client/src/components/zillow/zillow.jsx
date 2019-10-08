const Zillow = require('node-zillow');

// get key from environment variable
const z = new Zillow(process.env.ZWSID);

const params = {
    address: '2512 Mapleton Ave.',
    citystatezip: '80304',
};

// store the results
const results = await z.get('GetSearchResults', params);

const homeDetails = results.response.results.result[0].links[0].homedetails[0];

console.log(homeDetails);