// ///////////////////////////////////////////////////
// import libraries
// ///////////////////////////////////////////////////
const mssql = require('mssql')
const dotenv = require('dotenv')

// ///////////////////////////////////////////////////
// configure env to keep sensitve info hidden
// ///////////////////////////////////////////////////
dotenv.config()

// ///////////////////////////////////////////////////
// configure server and database
// ///////////////////////////////////////////////////
const config = {
  server: 'ohmywordle.database.windows.net',
  database: 'Oh My Wordle',
  // Put login details in env. variables for security
   user: process.env.dbusername,
   password: process.env.dbpassword,
  port: 1433,
  // Required for Azure
  options: {
    encrypt: true,
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
}

// ///////////////////////////////////////////////////
// obtain a connection instance
// ///////////////////////////////////////////////////
let dbConnected = true
let connectionError = null
const pools = new mssql.ConnectionPool(config)
  .connect().then(pool => {
    console.log('Connected to DB')
    return pool
  })
  .catch(err => {
    dbConnected = false
    connectionError = err
    console.log(err)
  })

module.exports = {
  sql: mssql,
  pools: pools,
  dbConnected: dbConnected,
  connectionError: connectionError
}
