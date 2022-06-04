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
    // if no token go to login page
    if (!req.session.ID) {
        res.redirect('/users')
        //res.render('users/login')
    // if there is a token continue to Game menu
    } else {
        res.render('users/gameMenu')
    }
})

router.post('/', (req, res) => {
    console.log('Button was clicked')

    if (!req.session.ID) {
      res.redirect('/login')
      } else {

    const accountId = req.session.ID
    
    database.pools
    // Run query
    .then((pool) => {
        return pool.request()
            //find if account is already in waiting queue
            .input('accountId', accountId)
            .query('Select account_id from dbo.queue where account_id = @accountId;')         
        })
        // Send back the result
        .then(result => {
        if (result.recordset.length === 0) {

            database.pools
            // Run query
            .then((pool) => {
                return pool.request()
                  // insert user into queue
                .input('account_id', accountId)
                .query('INSERT INTO dbo.queue (account_id) VALUES (@account_id);')
            })
            // Succesfully inserted into queue
            .then(result => {  
                res.redirect('/queue')

            })
           
        } else {
            //code for already in queue
            console.log('you are already in the queue')
            return res.redirect('/queue')
        }

    })
    // If there's an error, return that with some description
    .catch(err => {
        res.send({ Error: err })
    })
}

})

module.exports = router
