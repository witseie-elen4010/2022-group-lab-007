// ///////////////////////////////////////////////////
// import libraries, configurations & express instance
// ///////////////////////////////////////////////////
const express = require('express')
const database = require('../serverConfig.js')
const bcrypt = require('bcrypt')
const router = express.Router()

// ///////////////////////////////////////////////////
// cookies
// ///////////////////////////////////////////////////
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

// ///////////////////////////////////////////////////
// render response on create account page
// ///////////////////////////////////////////////////
router.get('/', (req, res) => {
    res.render('users/createAccount')
})

// ///////////////////////////////////////////////////
// validate data and send to server
// ///////////////////////////////////////////////////
router.post('/', async (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirm_password
    
    // Validate sign up input
    if (username.length !== 0 && email.length !== 0 &&  password === confirmPassword) {
      // hash the password so its encrypted on the server  
      const hashedPassword = await bcrypt.hash(password, 10)
      database.pools
      // Run the query
      .then((pool) => {
        return pool.request()
        .input('email', email)
        .query('Select email from dbo.AccountTbl where email = @email;')         
      })
      // Send back the result
      .then(result => {
      if (result.recordset.length === 0) {
        database.pools
        // Run query
        .then((pool) => {
        return pool.request()
        .input('username', username)
        .input('password', hashedPassword)
        .input('email', email)
        .query('INSERT INTO dbo.AccountTbl (username, password, email) VALUES (@username, @password, @email);')
      })
      // Send result
      .then(result => {
        return res.redirect('/home')
      })
      
      // check for an error
      .catch(err => {
        res.send({ Error: err })
      })
    } else {
      // return if email already in use
      return res.redirect('/createAccount')
      }
  })
  // check for an error
  .catch(err => {
    res.send({ Error: err })
  })
  } else {
  // check for wrong password
  return res.redirect('/createAccount')
  }
})


module.exports = router