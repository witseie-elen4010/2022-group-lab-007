const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('users/gamePage.ejs')
})

module.exports = router
