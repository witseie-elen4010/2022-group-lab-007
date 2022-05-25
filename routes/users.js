// ///////////////////////////////////////////////////
// import express library and create instance
// ///////////////////////////////////////////////////
const express = require('express')
const database = require('../serverConfig.js')
//const bcrypt = require('bcrypt')
const router = express.Router()

// ///////////////////////////////////////////////////
// routes
// ///////////////////////////////////////////////////
router.get('/', (req, res) => {
    console.log(req.query.username)
    res.send('User List')
})

router.get('/login', (req, res) => {
    res.render("users/login")
})   

// ///////////////////////////////////////////////////
// update users in server
// ///////////////////////////////////////////////////
router
    .route("/:id")
    .get((req, res) => {
        let x = req.params.id
        let y = users[x].username
        let z = users[x].password
        res.redirect('/home')
    })
    .put((req, res) => {
        let x = req.params.id
        res.send('Update User with ID '+x)
    })
    .delete((req, res) => {
        let x = req.params.id
        res.send('Delete User with ID '+x)
    })

router.param('id', (req, res, next, id) => {
    req.user = users[id]
    next()
})

// ///////////////////////////////////////////////////
// validate login by comparing users from server
// ///////////////////////////////////////////////////
router.post('/', (req, res) => {
    let username_ = req.body.username
    let password_ = req.body.password
    //const hashedPassword = bcrypt.hash(password_, 10)
    
    database.pools
    // Run the query on the database
    .then((pool) => {
    return pool.request()
    .input('username', username_)
    .input('password', password_)
    //.input('password',hashedPassword)

    // check for entry for corresponding password and username
    .query('SELECT username FROM dbo.AccountTbl WHERE username = @username AND password = @password;')         
    })

    // Send back the result to validate Login
    .then(result => {
        if (result.recordset.length === 1){
            console.log("LOGIN USERNAME FOUND AND PASSWORD CORRECT!")
          
            // Go to game menu if login successful
            return res.redirect('/home')
        }else{
            console.log("NO SUCH USER EXISTS")
          
            // Stay on login page if login unsuccessful
            res.render('users/login', { username: username_})
        }
    })
})
module.exports = router