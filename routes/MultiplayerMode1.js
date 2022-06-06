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

router.post('/', (req, res) => {
    if (!req.session.ID) {
        res.redirect('/login')
        } else {
            // put query to update scoretable here and redirect
            database.pools
            .then((pool)=>{
                return pool.request()
                .input('score', score)
                .query('INSERT INTO dbo.scoreboard (score) VALUE (@score) WHERE userID = @userID')
                .then(result=>{
                    res.redirect('/scoreboard')
                })
            })
        }
    }
)
    

    module.exports = router;