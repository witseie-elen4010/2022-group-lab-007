// ///////////////////////////////////////////////////
// import express library and create instance
// ///////////////////////////////////////////////////
// import Express
const express = require('express')
const router = express.Router()
// import Express session to check for token
const session = require('express-session');
const database = require('../serverConfig.js')

    // check if logged in
    router.get('/', (req, res) => {
        res.render('users/multiplayerMode1')
    })

    module.exports = router;