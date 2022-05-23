// requirements 
var config = require('./serverConfig');
const sql = require('mssql');
const Account = require('./createAccount');

// function for creating account
async function createAccount(AccountInfo){
    try{
        // configure
        let pool = await sql.connect(config);
        // SQL statement to insert entry into AccountTable on server
        let accounts = await pool.request().query("INSERT INTO AccountTable VALUES (4,'Zu','yay')");
        //let accounts = await pool.request().query("INSERT INTO AccountTable VALUES"+ String(AccountInfo));
        return accounts.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

// function for retrieving account information
async function getAccount(){
    try{
        let pool = await sql.connect(config);
        let accounts = await pool.request().query("SELECT * FROM AccountTable");
        return accounts.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    createAccount : createAccount,
    getAccount : getAccount
}