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

module.exports = router