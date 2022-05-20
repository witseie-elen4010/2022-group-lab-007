const dboperations = require('./serverActions');
var Db = require('./serverActions');
var createAccount = require('./createAccount');
var getAccount = require('./getAccount');

dboperations.createAccount().then(result => {
    console.log(result);
})

dboperations.getAccount().then(result => {
    console.log(result);
})