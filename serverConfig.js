// configure the communication with the server
const config = {
    user:'admin7',
    password: 'SoftwareGroup7',
    server: 'ohmywordle.database.windows.net',
    database: 'Oh My Wordle',
    options: {
        trustedconnection: true,
        enableArithPort : true,
        instancename : 'SQLEXPRESS', 
    },
    port: 1433
}

module.exports = config;