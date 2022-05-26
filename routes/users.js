// ///////////////////////////////////////////////////
// import express library and create instance
// ///////////////////////////////////////////////////
const express = require('express')
const database = require('../serverConfig.js')
const bcrypt = require('bcrypt')
const router = express.Router()

// ///////////////////////////////////////////////////
// routes
// ///////////////////////////////////////////////////
router.get('/', (req, res) => {
    console.log(req.query.username)
    res.send('Login unsuccessful')
})

// rerouting to the login page should login fail
router.get('/login', (req, res) => {
    res.render("users/login")
})   

// ///////////////////////////////////////////////////
// validate login by comparing users from server
// ///////////////////////////////////////////////////
router.post('/', (req, res) => {

    // user input from login page
    let username_ = req.body.username
    let password_ = req.body.password

  // Check the server database for the inputted username
    database.pools
    .then((pool) => {
      return pool.request()
      // input to query is the username
      .input('username', username_)
      // SQL Query to server database table
      .query('SELECT password FROM dbo.AccountTbl WHERE username = @username;')
  })

  // Compare the input password and the server password 
  .then(async (result) => {
    // server password is hashed therefore bcrypt.compare is used
    if (await bcrypt.compare(password_, result.recordset[0].password)) {      
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