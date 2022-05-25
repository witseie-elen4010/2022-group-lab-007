'use strict'

// ///////////////////////////////////////////////////
// imports and configuration files
// ///////////////////////////////////////////////////
const express = require('express')
const app = express()
const db = require('./serverConfig.js')

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
const InstructionsRouter = require('./routes/Instruction')

// ///////////////////////////////////////////////////
// Define routes
// ///////////////////////////////////////////////////
app.use('/create', createRouter)
app.use('/users', loginRouter)
app.use('/home', homeRouter)
app.use('/instructions', InstructionsRouter)

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