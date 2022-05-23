// requirements
const dboperations = require('./serverActions');
var Db = require('./serverActions');
var createAccount = require('./createAccount');
var getAccount = require('./getAccount');

// Call function to create account
dboperations.createAccount(AccountInfo).then(result => {
    console.log(result);
})

// Call function to retrieve account information
dboperations.createAccount().then(result => {
    console.log(result);
})

dboperations.getAccount().then(result => {
    console.log(result);
})