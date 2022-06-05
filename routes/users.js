// ///////////////////////////////////////////////////
// import express library and create instance
// ///////////////////////////////////////////////////
// import Express
const express = require('express')
// Server config
const database = require('../serverConfig.js')
// import hash capability for passwords
const bcrypt = require('bcrypt')
// create instance of express
const router = express.Router()
// import Express session for token creation
const session = require('express-session');
const FileStore = require('session-file-store')(session)

// ///////////////////////////////////////////////////
// routes
// ///////////////////////////////////////////////////

// rerouting to the login page should login fail
router.get('/login', (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            console.error(err);
        } 
    });
    res.render('users/login')
}) 

// use this function to destroy token from login
router.get('/', (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            console.error(err);
        } 
    });
    res.render('users/login')
})

// ///////////////////////////////////////////////////
// validate login by comparing users from server
// ///////////////////////////////////////////////////
router.post('/', (req, res) => {

    // user input from login page
    let username_ = req.body.username
    let password_ = req.body.password

    // if no input into the username field 
    if (username_.length === 0){
        return res.redirect('/users/login')
    }

    // Check the server database for the inputted username
    database.pools
    .then((pool) => {
        return pool.request()
        // input to query is the username
        .input('username', username_)
        // SQL Query to server database table
        .query('SELECT userID, password FROM dbo.AccountTable WHERE username = @username;')
    })

    // Compare the input password and the server password 
    .then(async (result) => {
    // server password is hashed therefore bcrypt.compare is used
    if (await bcrypt.compare(password_, result.recordset[0].password)) {      
        // create a token for user if login succeeds
        sessData = req.session
        sessData.ID = result.recordset[0].userID
        // if Login succeeds go to Game menu
        return res.redirect('/home')
    } else {
        // if Login fails remain on Login page
        return res.redirect('/users/login')
    }

    })
    // Error with the server database
    .catch(err => {
        res.send({ Error: err })
    })

})
module.exports = router