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
  // insert for choice of player type or waiting to play

})

module.exports = router