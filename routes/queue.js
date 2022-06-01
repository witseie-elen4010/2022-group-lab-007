const express = require('express')
const router = express.Router()
const db = require('../serverConfig.js')

router.get('/', (req, res) => {
  if (!req.session.ID) {
      res.redirect('/login')
      } else {
  res.render("users/foyer")
  }
})
/*
router.post('/', (req, res) => {
  // insert for choice of player type/ wait
  let nofriends = false
  if (nofriends===true){
    res.redirect('/queue')
  } 
  else{
    
    //insert into games table the two players with word they must guess
    //delete two players from queue table
    
    res.redirect('/MultiplayerMode1')
  }
  
})
*/
router.post('/', (req, res) => {
  console.log('Button was clicked')

  if (!req.session.ID) {
    res.redirect('/login')
  } else {
    const accountId = req.session.ID
    db.pools
    // Run query
    .then((pool) => {
      return pool.request()
      //check for other people in the lobby
      //.input('accountId', accountId)
      .query('Select * from dbo.queue')         
    })
    // Send back the result
    .then(result => {
      if (result.recordset.length === 1) {
        console.log("no other players yet")
        res.redirect('/queue')
      } else {
        console.log("you have a friend to play with!!")
        res.redirect('/MultiplayerMode1')
      }
    })
  }
})

module.exports = router