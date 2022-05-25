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
    // Run the query
    .then((pool) => {
    return pool.request()
    .input('username', username_)
    .input('password', password_)
    //.input('password',hashedPassword)
    .query('SELECT username FROM dbo.AccountTbl WHERE username = @username AND password = @password;')         
    })

    // Send back the result
    .then(result => {
        if (result.recordset.length === 1){
          console.log("LOGIN USERNAME FOUND AND PASSWORD CORRECT!")
          return res.redirect('/home')
        }else{
          console.log("NO SUCH USER EXISTS")
          res.render('users/login', { username: username_})
        }
    })
})
module.exports = router