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





module.exports = router