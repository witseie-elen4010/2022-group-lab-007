const express = require('express')
const router = express.Router()
const app = express()

router.get('/', (req, res) => {
    res.render('users/gamePage.ejs')
    
})

module.exports = router

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
  });
  
  module.exports = app