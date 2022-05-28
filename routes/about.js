const express = require('express')
const router = express.Router()

//Fill in route for about page
router.get('/', (req, res) => {
    res.render('users/About.ejs')
})

module.exports = router
