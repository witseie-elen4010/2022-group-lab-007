const express = require('express')
const router = express.Router()

//The route for Custom Multiplayer word page
router.get('/', (req, res) => {
    if (!req.session.ID) {
        res.redirect('/login')
        //Wont work if user is not logged on
        } else {
    res.render("users/multiplayerMode2")
    }
  })

module.exports = router
