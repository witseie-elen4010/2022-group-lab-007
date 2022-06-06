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
    // temporary variables to represent input from user
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
        .query('Select email from dbo.AccountTable where email = @email;')         
      })
      // Send back the result
      .then(result => {
      if (result.recordset.length === 0) {
        database.pools
        // Run query to add an account
        .then((pool) => {
        return pool.request()
        .input('username', username)
        .input('password', hashedPassword)
        .input('email', email)
        .query('INSERT INTO dbo.AccountTable (username, password, email) VALUES (@username, @password, @email);')
        
      })
      // Send result
      .then(result => {
        database.pools
        .then((pool)=>{
        pool.request()
        .input('username', username)
        .query('SELECT userID FROM dbo.AccountTable WHERE username = @username')
        .then(result=>{
          database.pools
          .then((pool)=>{
            pool.request()
            .input('userID', result.recordset[0].userID)
            .input('username', username)
            .input('games', 0)
            .input('wins', 0)
            .input('score', 0)
            .query('INSERT INTO dbo.scoreboard (userID, username, games, wins, score) VALUES (@userID, @username, @games, @wins, @score);')
            .then(result=>{
              return res.redirect('/home')
            })
          })
        })
      })
    })
  } else {
      // return if email already in use
      return res.redirect('/create')
    }
  })
  // check for an error
  .catch(err => {
    res.send({ Error: err })
  })
  } else {
  // check for wrong password
  return res.redirect('/create')
  }
})


module.exports = router