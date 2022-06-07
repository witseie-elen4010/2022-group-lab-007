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
    //const gameWon = req.body.gameWin
    //console.log("Game win:")
    //console.log(req.body.gameWin)
    const gameWon = true
    const userID = req.session.ID
    let score

    //Aquire games won and games played from score table
    database.pools
    .then((pool)=>{
        return pool.request()
        .input('userID',userID)
        .query('SELECT games,wins FROM dbo.scoreboard WHERE userID = @userID')
    }).then(result=>{
        let games = result.recordset[0].games
        let wins = result.recordset[0].wins
        // update values and calculate new score
        if(gameWon===true){
            games = games + 1
            wins = wins + 1
            score = (wins/games)*100
        }else{
            score = (wins/games)*100
        }
        // update Score Table on database
        database.pools
        .then((pool)=>{
            return pool.request()
            .input('userID',userID)
            .input('games',games)
            .input('wins',wins)
            .input('score',score)
            .query('UPDATE dbo.scoreboard SET games=@games,wins=@wins,score=@score WHERE (userID = @userID)')
        }).then(result=>{
            // route to home page
            res.redirect('/home')
        })
    })
})
    
    module.exports = router;