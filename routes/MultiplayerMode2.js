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

// after multiwordle game finishes
router.post('/', (req, res) => {
    const gameWon = req.body.gameWon
    const userID = req.session.id
    let score

    //Aquire games won and games played from score table
    database.pools
    .then((pool)=>{
        return pool.request()
        .input('userID',userID)
        .query('SELECT (games,wins) FROM dbo.scoreboard WHERE userID = @userID')
    }).then(result=>{
        let games = result.recordset[0].games
        let wins = result.recordset[0].wins
        // update values and calculate new score
        if(gameWon===true){
            games = games + 1
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
            .query('INSERT INTO dbo.scoreboard (games,wins,score) VALUES (@games,@wins,@score) WHERE userID = @userID')
        }).then(result=>{
            // route to home page
            res.redirect('/home')
        })
    })
})
module.exports = router

