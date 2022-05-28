'use strict'

// ///////////////////////////////////////////////////
// imports and configuration files
// ///////////////////////////////////////////////////
// Import express and create instance
const express = require('express')
const app = express()
// import server configuration
const db = require('./serverConfig.js')
// import express session
const session = require('express-session');
const FileStore = require('session-file-store')(session)

// ///////////////////////////////////////////////////
// user token session
// ///////////////////////////////////////////////////
app.use(session({
  store: new FileStore(),
  secret: 'lacrazywordgamesqwertyasdf',
  resave: false,
  saveUninitialized: false
})
)

// ///////////////////////////////////////////////////
// settings for route use
// ///////////////////////////////////////////////////
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(logger)

// ///////////////////////////////////////////////////
// set route paths
// ///////////////////////////////////////////////////
const createRouter = require('./routes/create')
const loginRouter = require('./routes/users')
const homeRouter = require('./routes/home')

// ///////////////////////////////////////////////////
// Define routes
// ///////////////////////////////////////////////////
app.use('/create', createRouter)
app.use('/users', loginRouter)
app.use('/home', homeRouter)

// ///////////////////////////////////////////////////
// define function
// ///////////////////////////////////////////////////
function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

module.exports = app

const port = process.env.PORT || 3000
app.listen(port)
console.log('Listening to port: ', port)