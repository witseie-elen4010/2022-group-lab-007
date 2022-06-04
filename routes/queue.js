// ///////////////////////////////////////////
// library imports and instance creations
// ///////////////////////////////////////////
const express = require('express')
const { io } = require('socket.io-client')
const router = express.Router()
const database = require('../serverConfig.js')
const session = require('express-session');

// ///////////////////////////////////////////
// render foyer page if token exists
// ///////////////////////////////////////////
router.get('/', (req, res) => {
  if (!req.session.ID) {
      res.redirect('/login')
      } else {
  res.render("users/foyer")
  }
})

// ///////////////////////////////////////////
// check queue button logic
// ///////////////////////////////////////////
router.post('/', (req, res) => {
  console.log('Button was clicked')

  // check if logged in
  if (!req.session.ID) {
    res.redirect('/login')
  
  // if logged in check the queue
  } else {
    const accountId = req.session.ID
    console.log(accountId)
    database.pools
    // Run query
    .then((pool) => {
      return pool.request()
      //check for other people in the queue
      .query('Select * from dbo.queue')         
    })
    // Send back the result
    .then(result => {
      
      // if result is 1 you are the only person in the queue
      if (result.recordset.length === 1) {
        console.log("no other players yet")
        res.redirect('/queue')
      
        // if not, continue to game
      } else {
        console.log("you have a friend to play with!!")

        // delete from queue table
        database.pools
        .then((pool) =>{
          return pool.request()
          .query('DELETE TOP (2) FROM dbo.queue')
        })

        res.redirect('/MultiplayerMode1')
      }
    })
  }
})

module.exports = router