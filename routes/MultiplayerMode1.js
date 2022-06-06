// import Express
const express = require('express')
const router = express.Router()
// import Express session to check for token
const session = require('express-session');
const database = require('../serverConfig.js')

// check if logged in
router.get('/', (req, res) => {
    res.render('users/multiplayerMode1')
})

// after multiwordle game finishes
router.post('/', (req, res) => {
    console.log("I made it!!!")
    //const gameWon = req.body.gameWin
    const gameWon = true
    //const userID = req.session.id
    let userID = 32
    let score

    //Aquire games won and games played from score table
    database.pools
    .then((pool)=>{
        return pool.request()
        .input('userID',userID)
        .query('SELECT games,wins FROM dbo.scoreboard WHERE userID = @userID')
    }).then(result=>{
        console.log("I made it here 2!!!")
        let games = result.recordset[0].games
        console.log("I made it here 3!!!")
        let wins = result.recordset[0].wins
        // update values and calculate new score
        if(gameWon===true){
            games = games + 1
            console.log("I made it here 4!!!")
            wins = wins + 1
            score = wins/games
        }else{
            score = wins/games
        }
        // update Score Table on database
        database.pools
        .then((pool)=>{
            return pool.request()
            .input('userID',userID)
            .input('games',games)
            .input('wins',wins)
            .input('score',score)
            .query('INSERT INTO dbo.scoreboard (games,wins,score) VALUES (@games,@wins,@score) WHERE userID = @userID;')
        }).then(result=>{
            console.log("I made it 5!!!")
            // route to home page
            res.redirect('/home')
        })
    })
})
    
    module.exports = router;