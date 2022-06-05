// ///////////////////////////////////////////
// library imports and instance creations
// ///////////////////////////////////////////
const express = require('express')
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
  res.render("users/foyerB")
  }
})

module.exports = router