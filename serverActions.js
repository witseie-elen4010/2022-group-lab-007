var config = require('./serverConfig');
const sql = require('mssql');
const Account = require('./createAccount');

async function createAccount(AccountInfo){
    try{
        let pool = await sql.connect(config);
        console.log(AccountInfo)
        let accounts = await pool.request().query("INSERT INTO AccountTable VALUES (4,'Zu','yay')");
        //let accounts = await pool.request().query("INSERT INTO AccountTable VALUES"+ String(AccountInfo));
        return accounts.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

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