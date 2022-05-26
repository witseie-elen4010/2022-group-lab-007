const express = require('express')
const router = express.Router()
const session = require('express-session');

// check if logged in
router.get('/', (req, res) => {
    // if no token go to login page
    if (!req.session.ID) {
        //res.redirect('/users')
        res.render('users/login')
    // if there is a token continue to Game menu
    } else {
        res.render('users/gameMenu')
    }
})

module.exports = router
