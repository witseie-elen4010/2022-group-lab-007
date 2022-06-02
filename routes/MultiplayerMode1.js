const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    if (!req.session.ID) {
        res.redirect('/login')
        } else {
    res.render("users/multiplayerMode1")
    }
})

module.exports = router